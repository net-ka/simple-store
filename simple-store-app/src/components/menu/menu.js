import React from 'react';
import './menu.scss'

const Menu = () => (
        <header>
            <h1>Магазин видеопластинок</h1>
            <div className="cart-wrapper">
                <p>Итого: 0 грн.</p>
                <button>Корзина (0)</button>
            </div>
        </header>
);

export default Menu