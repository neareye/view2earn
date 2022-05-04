const express = require('express');
const { getAllCategory } = require("../middlewares/validations/category.validation");
const categoryController = require('../controllers/category.controller');
const {isAuth} = require('../middlewares/authentication');

const router = express.Router();

router.get('/categories', [isAuth, getAllCategory], categoryController.getAllCategory);

module.exports = router;