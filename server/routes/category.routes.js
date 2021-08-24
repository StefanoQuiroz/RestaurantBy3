const express = require("express");
const router = express();
const {authenticate} = require('../config/jwt.config');

const {findCategory, createCategory, deleteCategory, updateCategory} = require("../controllers/category.controllers");

router.get(`/category`, findCategory);

router.post(`/category/create`, authenticate, createCategory);

router.delete(`/category/delete/:id`, authenticate, deleteCategory);

router.put(`/category/update/:id`, authenticate, updateCategory);

module.exports = router;