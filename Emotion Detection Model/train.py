import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, f1_score
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.callbacks import ModelCheckpoint
import tensorflowjs as tfjs

# ---------- Step 1: Load FER2013 CSV ----------
def load_fer2013_csv(path):
    df = pd.read_csv(path)
    pixels = df['pixels'].tolist()
    width, height = 48, 48
    faces = []

    for pixel_sequence in pixels:
        face = [int(pixel) for pixel in pixel_sequence.split()]
        face = np.asarray(face).reshape(width, height)
        faces.append(face.astype('float32'))

    faces = np.asarray(faces)
    faces = np.expand_dims(faces, -1)
    faces /= 255.0  # Normalize

    emotions = pd.get_dummies(df['emotion']).values  # One-hot encode
    return faces, emotions

# ---------- Step 2: Load and Preprocess Data ----------
faces, emotions = load_fer2013_csv("dataset/fer2013.csv")
X_train, X_test, y_train, y_test = train_test_split(faces, emotions, test_size=0.2, random_state=42)

# ---------- Step 3: Build CNN Model ----------
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(48, 48, 1)),
    MaxPooling2D(2, 2),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(2, 2),
    Flatten(),
    Dropout(0.5),
    Dense(128, activation='relu'),
    Dense(7, activation='softmax')  # FER2013 has 7 emotion classes
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# ---------- Step 4: Train the Model ----------
os.makedirs("model", exist_ok=True)
checkpoint = ModelCheckpoint("model/emotion_model.h5", save_best_only=True, monitor="val_accuracy", mode="max")

history = model.fit(
    X_train, y_train,
    batch_size=64,
    epochs=30,
    validation_data=(X_test, y_test),
    callbacks=[checkpoint]
)

# ---------- Step 5: Save Accuracy/Loss Curves ----------
history_df = pd.DataFrame(history.history)
history_df.to_csv("model/training_log.csv", index=False)

plt.figure(figsize=(8, 6))
plt.plot(history.history['accuracy'], label='Training Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.title('Model Accuracy Over Epochs')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)
plt.savefig("model/training_accuracy.png")
plt.show()

plt.figure(figsize=(8, 6))
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.title('Model Loss Over Epochs')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)
plt.savefig("model/training_loss.png")
plt.show()

# ---------- Step 6: Evaluate the Model ----------
y_pred_probs = model.predict(X_test)
y_pred = np.argmax(y_pred_probs, axis=1)
y_true = np.argmax(y_test, axis=1)

# Classification Report
report = classification_report(y_true, y_pred, target_names=[
    "Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"
])
print("Classification Report:\n", report)
with open("model/classification_report.txt", "w") as f:
    f.write(report)

# Confusion Matrix
cm = confusion_matrix(y_true, y_pred)
plt.figure(figsize=(10, 8))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"],
            yticklabels=["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"])
plt.title('Confusion Matrix - Emotion Detection')
plt.xlabel('Predicted')
plt.ylabel('True')
plt.tight_layout()
plt.savefig("model/confusion_matrix.png")
plt.show()

# Weighted F1 Score
weighted_f1 = f1_score(y_true, y_pred, average='weighted')
print(f"\n📊 Weighted F1-Score: {weighted_f1:.4f}")
with open("model/f1_score.txt", "w") as f:
    f.write(f"Weighted F1-Score: {weighted_f1:.4f}")

# ---------- Step 7: Export Model to TensorFlow.js ----------
print("Converting model to TensorFlow.js format...")
tfjs.converters.save_keras_model(model, "model/tfjs_emotion_model")
print("✅ Model exported to: model/tfjs_emotion_model/")
