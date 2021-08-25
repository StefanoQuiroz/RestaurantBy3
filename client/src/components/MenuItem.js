import React from 'react';
import { Link } from 'react-router-dom';
import './MenuItem.scss';

const MenuItem = (props) => {
    const {item} = props;
    return (
        <div className="menuCard">
            <img src={item.image.url} alt={item.name}/>
            <div className="menuCard--content">
                <h2 title={item.name}>{item.name}</h2>
                <p>{item.description}</p>
                <span>$ {item.price}</span>
            </div>
            <div className="menuCard--button">
                <Link className="menuCard--buy" to={`#`}>
                    Seleccionar
                </Link>
            </div>
        </div>
    );
}

export default MenuItem;