//Registro de prueba reemplazar por el de DORIAN
import React, { useContext, useState } from 'react';
import { MyContext } from '../App';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Register.scss';

const Register = () => {
    const {userData, setUserData} = useContext(MyContext)
    
    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    
    const history = useHistory();
    const home = (event) => {
        history.push("/login")
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setInput({
            ...input,
            [name]:value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/users/new`, input)
            .then(response => {
                if(response.data && response.data.data){
                    setUserData(userData.concat([response.data.data]));
                    Swal.fire({
                        icon: "success",
                        title: "Registrado",
                        text: "Registrado exitoso"
                    })
                    home(event);
                } else {
                    Swal.fire({
                        icon:"error",
                        title: "Error en el Registro",
                        text: response.data.error.message
                    })
                }
            });
        }

    const {firstName, lastName, email, password, confirmPassword} = input;

    return (
        <div className="registerPage">
            <form onSubmit={onSubmit}>
                <h2>Register</h2>
                <input type="text" name="firstName" value={firstName} placeholder="Nombre" onChange={onChange} required/>
                <input type="text" name="lastName" value={lastName} placeholder="Apellido" onChange={onChange} required/>
                <input type="email" name="email" value={email} placeholder="Email" onChange={onChange} required/>
                <input type="password" name="password" value={password} placeholder="Contraseña" onChange={onChange} required/>
                <input type="password" name="confirmPassword" value={confirmPassword} placeholder="Confirmar contraseña" onChange={onChange} required/>
                <div className="row">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default Register;