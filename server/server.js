require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileUpload'); //para cargar archivos

const PORT = process.env.PORT;

//calling mongoDB
const connectMongo = require('./config/mongoDb');
connectMongo();

//middlewares
app.use(fileUpload({useTempFiles:true})) //archivos temporales en lugar de memoria
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Rutas
////USER
app.use(`/api`, require('./routes/user.routes'));
////CLOUDINARY
app.use(`/api`, require('./routes/upload.routes'));
////CATEGORY
app.use(`/cat`, require('./routes/category.routes'));


app.listen(PORT, ()=>{
    console.log(` 1 : The server is lock and loading at PORT: ${PORT}`);
});