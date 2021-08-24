const mongoose = require('mongoose');

//Tipo de menu Postre - Entrada - etc
const CategorySchema = new mongoose.Schema({
    category : {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {timestamps: true})

const Category =  mongoose.model('Categorias', CategorySchema)

module.exports = Category;
