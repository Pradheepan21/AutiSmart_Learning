import numpy as np
import cv2
from tensorflow.keras.utils import to_categorical

def preprocess_input(x):
    x = x.astype('float32')
    x = x / 255.0
    return x

def load_fer2013_csv(csv_path):
    import pandas as pd
    data = pd.read_csv(csv_path)
    pixels = data['pixels'].tolist()
    width, height = 48, 48
    faces = []
    for pixel_sequence in pixels:
        face = [int(pixel) for pixel in pixel_sequence.split()]
        face = np.asarray(face).reshape(width, height)
        face = preprocess_input(face)
        faces.append(face)
    faces = np.asarray(faces)
    faces = np.expand_dims(faces, -1)
    emotions = pd.get_dummies(data['emotion']).values
    return faces, emotions
