import React, { useContext } from 'react';
//import { MyContext } from '../App';
import { FaBars,  FaTimes } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Header.scss';

const Header = () => {
    //const value = useContext(MyContext);
    
    /* //Vista del NavBar Admin
    const adminNavBar = () => {
        return(
            <>
                <li><Link to={`/create_menu`}>Crear menu</Link></li>
                <li><Link to={`/category`}>Categorias</Link></li>
            </>
        )
    }

    //Vista del NavBar Usuario
    const userNavBar = () => {
        return(
            <>
                <li><Link to={`/history`}>Historial</Link></li>
                <li><Link to={`/`}>Logout</Link></li>
            </>
        )
    } */

    const onLogout = async () => {
        await axios.get(`/api/logout`)
    }

    return (
        <header>
            <div className="menu"><FaBars/></div>
            <div className="logo">
                <h1><Link to = {`/`}>Restaurante</Link></h1>
            </div>
            <ul>
                <li><Link to={`/`}>Menu</Link></li>
                <li><Link to={`/login`}>Login</Link></li>
                <li><Link onClick={onLogout} to={`/`}>Logout</Link></li>
                <li><FaTimes className="menu"/></li>
            </ul>
            <div className="cartIcon">
                <span>0</span>
                <Link to={`/cart`}>
                    <GiCookingPot style={{fontSize: "1.8rem"}}/>
                </Link>    
            </div>     
        </header>
    );
}

export default Header;