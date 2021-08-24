const Menu = require("../models/menu.models");

const findMenu = (req, res) => {
    Menu.find({}).sort({date: -1})
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error:error, message:"Algo salió mal en el menu"})
            res.sendStatus(404);
        })
}

const findSingleMenu = (req, res) => {
    Menu.findById({_id: req.params.id})
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error: error, message: "Algo salió mal en el menu"})
            res.sendStatus(404)
        })
}

const createMenu = (req,res) => {
    Menu.findOne({name: req.body.name})
        .then(result => {
            if(result){
                res.json({error: true, message:"El nombre del plato ya se encuentra registrado"})
            } else {
                Menu.create(req.body)
                    .then(result => res.json({data: result}))
                    .catch(error => {
                        res.json({error: error, message:"Algo salió mal"});
                        res.sendStatus(500)
                    })
            }
        })
}

const updateMenu = (req, res) => {
    Menu.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error: error, message: "Algo salió mal"});
            res.sendStatus(500);
        })
}

const deleteMenu = (req, res) => {
    Menu.deleteOne({_id: req.params.id})
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error: error, message: "Algo salió mal"});
            res.json(202);
        })
}

module.exports = {findMenu, findSingleMenu, createMenu, updateMenu, deleteMenu};