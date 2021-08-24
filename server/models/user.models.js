const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName :{ 
        type: String,
        required : [true, "Nombre obligatorio"],
        trim: true //para eliminar los espacions en ambos lados
    },
    
    lastName :{ 
        type: String,
        required : [true, "Apellido obligatorio"],
        trim: true //para eliminar los espacions en ambos lados
    },
    
    email :{ 
        type: String,
        required : [true, "Email obligatorio"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Escriba un formato correcto como name@mail.com" 
        },
        unique: true //unique, porque el email es único al igual que su id
    },
    
    password :{ 
        type: String,
        required : [true, "Contraseña obligatoria"],
        minlength: [5, "La contraseña debe tener al menos 5 carácteres"],
        trim: true //para eliminar los espacions en ambos lados
    },
    //rol usuario comun o administrador
    rol : {
        type: Number,
        default: 0
    },
    //Para el carrito de platillos por usuario
    cart : { 
        type: Array,
        default: []
    }
    

}, {timestamps: true})

//ConfirmPassword
UserSchema.virtual("confirmPassword")
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value)

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Las contraseñas deben de coincidir");
    }
    next();
})

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})

const User = mongoose.model('Users', UserSchema);

module.exports = User;