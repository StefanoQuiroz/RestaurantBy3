const express = require("express");
const router = express();
const {authenticate, authenticateAdmin} = require('../config/jwt.config');

const {findCategory, createCategory, deleteCategory, updateCategory} = require("../controllers/category.controllers");

router.get(`/category`, findCategory);

router.post(`/category/create`, authenticate, authenticateAdmin, createCategory);

router.delete(`/category/delete/:id`, authenticate, authenticateAdmin, deleteCategory);

router.put(`/category/update/:id`, authenticate, authenticateAdmin, updateCategory);

module.exports = router;