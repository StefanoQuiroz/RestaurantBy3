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
            if(payload.rol === 1){
                res.locals.isAdmin = true;

            }
            next();
        }
    })
}

//Autenticación del admin -PROBLEMA (AUTHENTICATEADMIN, )
/* const authenticateAdmin = async (req, res, next) => {
    console.log("Body", req.body)
    try{
        const usuario = await User.findOne({
            email: req.body.email
        })
        console.log("User", usuario)
        if(usuario.rol === 0){ //--> identifica a un usuario comun  
            return res.status(400).json({message: "Acceso denegado, es solamente para el Administrador"});
        } else {
            next();
        }       
    } catch(error){
        console.log(error);
        return res.status(500).json({message: "Algo salió mal de authenticateAdmin"})
    } */

    //code de Grecia
   /*  User.find({email: 'admin@gmail.com'}) 
        .then(users => {
            if(!users || users.length == 0) {
               User.create(req.body)
                    .then(usuario => console.log('Usuario creado exitosamente', usuario))
                    .catch(err => console.log('Error al crear el usuario inicial', err))
            }
        }) */

    /* User.findOne({email: req.body.email})
        .then( result => {
            console.log("resultado", result)
            if(result.rol === 0){
                res.json({message: "Acceso denegado solamente al Administrador"})
            } else{
                next();
            }
        })
        .catch(error => res.json({error: error, message: "Algo salió mal"})) */
//}

module.exports = {secretKey, authenticate};
