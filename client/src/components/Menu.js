import React, { useContext } from 'react';
import { MyContext } from '../App';
import MenuItem from './MenuItem';
import './Menu.scss';

const Menu = () => {
    
    const {menus, setMenus} = useContext(MyContext);
    
    return (
        <>
            <div className="platos">
                {
                    menus&&menus.map((item) => (//item viene a ser un objeto del arreglo menus o platos
                        <MenuItem key={item._id} item={item}/>
                    ))
                }
            </div>
            {menus.length === 0 &&
                 <div className="loading">
                    <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2240,c_limit/Netflix_LoadTime.gif" alt="loading" />
                </div>
            }
        </>
    );
}
//retirar el .loading tnato react como scss
export default Menu;