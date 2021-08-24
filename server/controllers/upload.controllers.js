const cloudinary = require('../config/cloudinary.config');
const  upLoading = (req, res) => {
    try{
        console.log(req.files);
        if(!req.files){
            return res.json({message : "Ningún archivo para subir"})
        }
        const file = req.files.file; //archivo de la imagen en formato .jpeg o .png
        if(file.size > 1024*1024){ //1024*1024 === 1mb
            return res.json({message: "Excede el limite de la memoria de almacenamiento"})
        }
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){//formatos .jpeg o .png para las imágenes
            return res.json({message: "Formato incorrecto, debe ser .jpeg ó .png"})
        }
        //Para la carga de archivos con cloudinary  --> https://cloudinary.com/documentation/node_integration
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"} , async(error, result) => {
            if(error){
                console.log(error);
            } else {
                res.json({message: result});
            }
        })
    } catch(error) {
        res.json({message: "Error al subir imagen a cloudinary"})
        res.sendStatus(500);
    }
}

module.exports = {upLoading};