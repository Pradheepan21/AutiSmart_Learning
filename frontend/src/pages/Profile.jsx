import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({ name: '', age: '', contact: '', email: '' });
  const [profilePic, setProfilePic] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  // Fetch profile data on page load
  useEffect(() => {
    fetch('http://localhost:5000/api/profile/get-profile')
      .then(res => res.json())
      .then(data => {
        setUser({
          name: data.name || '',
          age: data.age || '',
          contact: data.contact || '',
          email: data.email || '',
        });
        if (data.profilePicUrl) {
          setProfilePic(data.profilePicUrl);
        }
      })
      .catch(err => {
        console.error("Failed to fetch profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePic(imageURL);
    }
  };

  const handleDeleteProfilePic = () => {
    setProfilePic(null);
  };

  const handleSave = () => {
    const dataToSave = {
      ...user,
      profilePicUrl: profilePic,
    };

    fetch('http://localhost:5000/api/profile/save-profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })
      .then(res => res.json())
      .then(data => {
        alert("✅ Profile saved successfully!");
        setIsEditing(false);
      })
      .catch(err => {
        console.error("Failed to save profile:", err);
        alert("❌ Failed to save profile.");
      });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/profile-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/50"></div>

      <div className="relative z-10 bg-gradient-to-b from-blue-200 to-blue-300 p-10 rounded-3xl shadow-2xl border-8 border-white w-full max-w-lg text-center">
        
        {/* Profile Picture */}
        <div 
          className="relative w-40 h-40 mx-auto rounded-full border-4 border-white cursor-pointer overflow-hidden shadow-xl transform hover:scale-105 transition"
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-300 text-gray-700 text-lg font-bold rounded-full">
              Profile
            </div>
          )}

          {showOptions && (
            <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center space-y-3">
              <label className="bg-white px-5 py-3 text-md rounded-lg cursor-pointer font-bold shadow-lg">
                Edit
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
              {profilePic && (
                <button 
                  onClick={handleDeleteProfilePic} 
                  className="bg-red-500 text-white px-5 py-3 text-md font-bold rounded-lg shadow-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="bg-white p-6 mt-6 rounded-2xl shadow-lg text-left border-4 border-yellow-400">
          {isEditing ? (
            <>
              <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" className="w-full p-3 border-2 rounded-xl mt-2"/>
              <input type="number" name="age" value={user.age} onChange={handleChange} placeholder="Age" className="w-full p-3 border-2 rounded-xl mt-2"/>
              <input type="text" name="contact" value={user.contact} onChange={handleChange} placeholder="Contact" className="w-full p-3 border-2 rounded-xl mt-2"/>
              <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" className="w-full p-3 border-2 rounded-xl mt-2"/>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-blue-900">👤 Name: <span className="ml-2 font-normal">{user.name || "N/A"}</span></p>
              <p className="text-lg font-bold text-blue-900">🎂 Age: <span className="ml-2 font-normal">{user.age || "N/A"}</span></p>
              <p className="text-lg font-bold text-blue-900">📞 Contact: <span className="ml-2 font-normal">{user.contact || "N/A"}</span></p>
              <p className="text-lg font-bold text-blue-900">📧 Email: <span className="ml-2 font-normal">{user.email || "N/A"}</span></p>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          {isEditing ? (
            <button 
              onClick={handleSave} 
              className="px-8 py-3 bg-green-500 text-white text-xl font-bold rounded-xl shadow-md hover:bg-green-600 transition-transform transform hover:scale-110"
            >
              ✅ Save
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)} 
              className="px-8 py-3 bg-blue-500 text-white text-xl font-bold rounded-xl shadow-md hover:bg-blue-600 transition-transform transform hover:scale-110"
            >
              ✏️ Edit
            </button>
          )}
          <button 
            onClick={() => navigate('/progress')} 
            className="px-8 py-3 bg-yellow-500 text-white text-xl font-bold rounded-xl shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-110"
          >
            🏆 View Progress
          </button>
        </div>
      </div>
    </div>
  );
}
