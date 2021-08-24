const Category = require("../models/category.models");

const findCategory = (req, res) => {
    Category.find({})
        .then(result => res.json({data: result}))
        .catch(error => {
           res.json({error: error, message: "Categoria no encontrada"});
           res.sendStatus(404); 
        })
}

const createCategory = async (req, res) => {
    //console.log("isAdmin", res.locals)
    Category.findOne({category: req.body.category})
        .then( result => {
            if(result){
                res.json({error: true, message: "Esta categoría ya existe! "})
            } else {
                Category.create(req.body)
                    .then(result => res.json({data: result}))
                    .catch(error => {
                        res.json({error:error, message:"No se pudo crear la categoría"});
                        res.sendStatus(500)
                    })
            }
        })
        .catch(error => {
            res.json({error:error, message:"No se encontro la categoría"});
            res.sendStatus(500);
        })
} 

const deleteCategory = (req, res) => {
    Category.deleteOne({_id : req.params.id})
        .then(result => res.json({data:result}))
        .catch(error => {
            res.json({error: error, message: "No se pudo borrar la categoría"});
            res.json(202);
        })

}

const updateCategory = (req,res) => {
    Category.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(result => res.json({data: result}))
        .catch(error => {
            res.json({error: error, message: "No se pudo actualizar la categoría"});
            res.sendStatus(500);
        })
}
module.exports = {findCategory, createCategory, deleteCategory, updateCategory};