const express = require('express');
const router = express();
//const {authenticate, authenticateAdmin} = require("../config/jwt.config");
const {upLoading, deleteImages} = require("../controllers/upload.controllers");

//siempre colocar  el authenticate, authenticateAdmin
//subir imagenes a cloudinary solo puede hacerlo el admin
router.post(`/image/upload`, upLoading);

//borrar imágenes de cloudinary solo lo puede hacer el admin
router.post(`/image/delete`, deleteImages)

module.exports = router;