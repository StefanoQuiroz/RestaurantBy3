const express = require('express');
const router = express();
const {authenticate, authenticateAdmin} = require("../config/jwt.config");
const {upLoading} = require("../controllers/upload.controllers");

//subir imagenes a cloudinary
router.post(`/upload`, upLoading);

module.exports = router;