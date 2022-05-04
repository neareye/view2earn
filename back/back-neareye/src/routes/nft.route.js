const express = require('express');
const nftController = require('../controllers/nft.controller');
const {isAuth} = require('../middlewares/authentication');

const router = express.Router();

router.get('/nfts', [isAuth], nftController.getNfts);

module.exports = router;