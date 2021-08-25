//Registro de prueba reemplazar por el de DORIAN
import React, { useContext, useState } from 'react';
import { MyContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Register = () => {
    const {userData, setUserData} = useContext(MyContext)
    
    const [inputs, setInputs] = useState({
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

    const actualizarForm = (event) => {
        const {name, value} = event.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }

    const guardar = (event) => {
        event.preventDefault();
        axios.post(`/api/users/new`, inputs)
            .then(resp => {
                if(resp.data && resp.data.data){
                    setUserData(userData.concat([resp.data.data]));
                    Swal.fire({
                        icon: "success",
                        title: 'Usuario registrado exitosamente!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                    home(event);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al crear el usuario",
                        text: resp.data.error.message
                    })
                }
            });
        }

    const {firstName, lastName, email, password, confirmPassword} = inputs;

    return (
        <Container style={{border:'2px solid black', marginTop:'1.5rem', backgroundColor:'white'}}>
            <Form onSubmit={guardar}>
                <Row>
                    <h4 style={{textAlign: 'center'}}>Register</h4>
                </Row>
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="fName" sm={4}>Nombre: </Label>
                    <Col sm={8}>
                        <Input type="text" name="firstName" id="fName" value={firstName} onChange={actualizarForm} style={{border: '2px solid black'}} required/>
                        {(firstName.length>0 && firstName.length<3) && <p style={{color:'red'}}>First name must be at least 3 characters or longer</p>}
                    </Col>
                </FormGroup>

                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="lName" sm={4}>Apellido: </Label>
                    <Col sm={8}>
                        <Input type="text" name="lastName" id="lName" value={lastName} onChange={actualizarForm} style={{border: '2px solid black'}} required/>
                        {(lastName.length>0 && lastName.length<3) && <p style={{color:'red'}}>Last name must be at least 3 characters or longer</p>}
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input type="email" name="email" id="email" value={email} onChange={actualizarForm} style={{border: '2px solid black'}} required/>
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="passoword" sm={4}>Contraseña: </Label>
                    <Col sm={8}>
                        <Input type="password" name="password" id="password" value={password} onChange={actualizarForm} style={{border: '2px solid black'}} required/>
                        {(password.length>0 && password.length<5) && <p style={{color:'red'}}>Password must be at least 5 characters or longer</p>}
                    </Col>
                </FormGroup>
            
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="confPassword" sm={4}>Confirmar Contraseña: </Label>
                    <Col sm={8}>
                        <Input type="password" name="confirmPassword" id="confPassword" value={confirmPassword} onChange={actualizarForm} style={{border: '2px solid black'}} required/>
                        {(password !== confirmPassword) && <p style={{color:'red'}}>Password and confirm password must be match</p>}
                    </Col>
                </FormGroup>
                
                <FormGroup row style={{padding: '1rem'}}>
                    <Col xs style={{
                         display: "flex",
                         flexDirection :"column",
                         alignItems: "center",
                         justifyContent: "center"
                    }}>
                        <Button size='lg' style={{backgroundColor: '#6495ED', width:'25%', color:'#000' , fontWeight:'bold', border:'2px solid black'}} type="submit"><Link to={`/login`}style={{textDecoration: "none", color: "#fff"}}>Registrase</Link></Button>       
                    </Col>
                </FormGroup>  
            </Form>
        </Container>
        
    );
}

export default Register;