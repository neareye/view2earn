const express = require('express');
const videoController = require('../controllers/video.controller');
const {isAuth} = require('../middlewares/authentication');

const router = express.Router();

router.get('/videos', [isAuth], videoController.getVideos);

module.exports = router;