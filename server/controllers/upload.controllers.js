const cloudinary = require('../config/cloudinary.config');
const fs = require("fs"); //nos permite hacer un CRUD de los archivos

//Funcion para enviar imagenes a cloudinary
const  upLoading = (req, res) => {
    try{
        console.log(req.files);
        if(!req.files){
            return res.json({message : "Ningún archivo para subir"})
        }
        const file = req.files.file; //archivo de la imagen en formato .jpeg o .png
        if(file.size > 1024*1024){ //1024*1024 === 1mb
            removeTmp(file.tempFilePath);
            return res.json({message: "Excede el limite de la memoria de almacenamiento"})
        }
        if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){//formatos .jpeg o .png para las imágenes
            removeTmp(file.tempFilePath);
            return res.json({message: "Formato incorrecto, debe ser .jpeg ó .png"})
        }
        //Para la carga de archivos con cloudinary  --> https://cloudinary.com/documentation/node_integration
        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"} , async(error, result) => {
            if(error){
                console.log(error);
            } else {
                //res.json({message: result});
                removeTmp(file.tempFilePath);
                res.json({public_id: result.public_id, url: result.secure_url});
            }
        })
    } catch(error) {
        return res.json({message: "Error al subir imagen a cloudinary"}).status(500);
    }
}

//funcion para borrar imagenes de cloudinary

const deleteImages = (req, res) => {
    try{
        const {public_id} = req.body;
        if(!public_id){
            return res.json({message: "Ninguna imagen seleccionada"}).status(400);
        }
        cloudinary.v2.uploader.destroy(public_id, async(error, result) => {
            if(error){
                console.log(error);
            } else {
                res.json({message: "Imagen borrada"});
            }
        })
    } catch(error){
        return res.json({message: "Algo salió mal al borrar imágenes"})
    }
}

//Eliminar los archivos dentro de la carpeta tmp
const removeTmp = (path) => {//fs.unlink() para eliminar archivos de forma nativa en JS
    fs.unlink(path, error => {
        if(error){
            console.log(error);
        }
    })
}

module.exports = {upLoading, deleteImages};