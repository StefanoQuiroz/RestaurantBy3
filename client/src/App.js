import React, { createContext, useEffect, useState } from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './components/Header';
import Main from './view/Main';
import axios from 'axios';
import Swal from 'sweetalert2';

export const MyContext = createContext();



function App() {
  //cargar la data del menu
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    axios.get(`/api/menu`)
        .then(response => setMenus(response.data.data))
        .catch(err => Swal.fire({
            icon: "error",
            title: "Error en cargar los datos",
            text: "Problemas al cargar los datos"
        }))
  }, [])
  
  //cargar la data del usuario
  const[userData, setUserData] = useState([]);
  useEffect(() => {
    axios.get(`/api/users`)
      .then(response => setUserData(response.data.data))
      .catch(err => Swal.fire({
        icon: "error",
        title: "Error en Usuarios",
        text: "Error en cargar la data de los usuarios"
    }))
  }, [])
  

  //console.log("Menus", menus)

  return (
    <MyContext.Provider value={{menus, setMenus, userData, setUserData}}>
      <Router>
        <div className="App">
          <Header />
          <Main/>
        </div>
      </Router>
    </MyContext.Provider>
  );
}
export default App;

