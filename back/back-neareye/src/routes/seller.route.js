const express = require('express');
const { updateSetting } = require("../middlewares/validations/setting.validation");
const sellerController = require('../controllers/seller.controller');
const {isAuth} = require('../middlewares/authentication');

const router = express.Router();

router.post('/importSeller', [isAuth], sellerController.importSellers);
router.get('/sellers', [isAuth], sellerController.getSellers);
router.post('/seller', [isAuth], sellerController.updateSellers);
router.delete('/seller/:sellerId', [isAuth], sellerController.deleteSeller);

module.exports = router;