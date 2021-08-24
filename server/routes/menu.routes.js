const express = require('express');
const router = express();
const {findMenu, findSingleMenu, createMenu, updateMenu, deleteMenu} = require("../controllers/menu.controllers");

router.get("/menu", findMenu);
router.get("/menu/:id", findSingleMenu);
router.post("/menu/new", createMenu);
router.put("/menu/update/:id", updateMenu);
router.delete("/menu/delete/:id", deleteMenu);

module.exports = router;