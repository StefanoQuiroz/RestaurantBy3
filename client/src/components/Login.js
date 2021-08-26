//Login de prueba reemplazar por el de DORIAN
import React, { createContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
//export const loginContext = createContext();
const Login = () => {

    //const [isAdmin, setIsAdmin] = useState(false);
    
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    
    const history = useHistory();
    const home = (event) => {
        history.push("/")
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/login", user)
            .then(response => {
                //console.log("rol", response.data.data.rol)
                //response.data.data.rol === 1 ? setIsAdmin(true) : setIsAdmin(false);
                if(response.data && !response.data.error){
                    home(event);
                } else {
                    Swal.fire({
                        icon:"error",
                        title: "Error - Login",
                        text: response.data.message
                    })
                }
            });
        }
    //console.log("Es admin ?", isAdmin);
    //cambie algo
    const {email, password} = user;
    return (
        <Container  style={{border:'2px solid black', marginTop:'1.5rem', backgroundColor:'white'}}>
            <Form onSubmit={onSubmit} >
                <Row>
                    <h4 style={{textAlign: 'center'}}>Login</h4>
                </Row>
                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="email" sm={4}>Email</Label>
                    <Col sm={8}>
                        <Input type="email" id="email" name="email" value={email} onChange={onChange} required style={{border: '2px solid black'}}/>
                    </Col>
                </FormGroup>

                <FormGroup row style={{padding: '1rem'}}>
                    <Label for="password" sm={4}>Password</Label>
                    <Col sm={8}>
                        <Input type="password" id="password" name="password" value={password} onChange={onChange} required style={{border: '2px solid black'}}/>
                    </Col>
                </FormGroup>
                
                <FormGroup row style={{padding: '1rem'}}>
                    <Col xs style={{
                         display: "flex",
                         flexDirection :"column",
                         alignItems: "center",
                         justifyContent: "center"
                    }}>
                        <Button color="primary" size='lg' style={{width:'15%', color:'#fff' , fontWeight:'bold', border:'2px solid black', justifyContent: "center"}} type="submit">Enviar</Button>
                        <Button  size='lg' style={{width:'15%', marginTop : "1rem",color:'#fff', background: "orange", fontWeight:'bold', border:'2px solid black', justifyContent: "center"}} type="submit"><Link to={`/register`}style={{textDecoration: "none", color: "#fff"}}>Registrase</Link></Button>
                    </Col>
                </FormGroup>  
            </Form> 
        </Container>   
    );
}

export default Login;