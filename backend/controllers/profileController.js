const Profile = require('../models/profile')
// Save or update profile
const saveProfile = async (req, res) => {
  try {
    const existing = await Profile.findOne();
    if (existing) {
      await Profile.findOneAndUpdate({}, req.body);
    } else {
      const profile = new Profile(req.body);
      await profile.save();
    }
    res.status(201).json({ message: 'Profile saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save profile' });
  }
};

// Get profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

module.exports = { saveProfile, getProfile };
