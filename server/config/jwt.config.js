const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const User = require("../models/user.models");

//Autenticación comun del usuario
const authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secretKey, (error, payload) => {
        //console.log("Payload: ", payload)
        if(error){
            res.status(401).json({verified:false, message: "Acesso denegado --fail authenticate"})
        } else {
            req.user = payload;
            next();
        }
    })
}

//Autenticación del Administrador --Probelma resuelto use en vez de User.findOne({}) --> User.findById()
const authenticateAdmin = (req, res, next) => {
    //console.log(req.user);
    User.findById(req.user._id)
        .then( result => {
            //console.log("Resultado", result)
            if(result.rol === 0){
                res.json({message: "Acceso denegado, es solamente para el Administrador"})
            } else{// caso contrario sera de un usuario común
                next();
            }
        })
        .catch(error => res.json({error: error, message: "Algo salió mal de authenticate admin"}))
}

module.exports = {secretKey, authenticate, authenticateAdmin};