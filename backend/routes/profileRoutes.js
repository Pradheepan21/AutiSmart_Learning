const express = require('express');
const { saveProfile, getProfile } = require('../controllers/profileController');

const router = express.Router();

router.post('/save-profile', saveProfile);
router.get('/get-profile', getProfile);

module.exports = router;
