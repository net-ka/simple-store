import React, { Component } from 'react';
import './menu.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';
// import { setFilter } from '../../actions/filter';

class Menu extends Component {
    changeFilmNumber(targetBtn, filmEl) {
        const that_removeFromCart = this.removeFromCart.bind(this);

        const moreFilm = document.querySelectorAll('.more-film');
        const lessFilm = document.querySelectorAll('.less-film');

        moreFilm.forEach(item => {
            if(targetBtn === item) {
                this.props.changeCartNumber(filmEl.id, filmEl.number + 1);
            }
        });

        lessFilm.forEach(item => {
            if(targetBtn === item && filmEl.number >= 1) {
                this.props.changeCartNumber(filmEl.id, filmEl.number - 1);
            }
            if(targetBtn === item && filmEl.number < 1) {
                that_removeFromCart(filmEl.id);
            }
        });
    }

    removeFromCart(id) {
        if(this.props.cartItems.some(item => item.id === id)) {
            this.props.removeFromCart(id);
        }
    }

    showCart() {
        const cart = document.querySelector('.cart');
        cart.classList.toggle('hidden');
    }

    hideCart() {
        const cart = document.querySelector('.cart');
        cart.classList.add('hidden');
    }

    render() {
        const { cartItems, totalPrice, count }  = this.props;
        return (
            <header>
                <h1>Магазин видеопластинок</h1>
                <div className="cart-wrapper">
                    <button onClick={() => this.showCart()}>Корзина ({count})</button>
                </div>

                <div className="cart hidden" onMouseLeave={() => this.hideCart()}>
                    <ul>
                        {cartItems.length === 0 && <li>Пока в вашей корзине пусто :(</li>}
                        {cartItems.length > 0 && cartItems.map(item => {
                            return (
                                <li key={item.id} onClick={(e) => this.changeFilmNumber(e.target, item)}>
                                    <span className="cart-titles">{item.title}</span>
                                    <div className="manage-number">
                                        <button className="change-number less-film">-</button>
                                        <span>{item.number}</span>
                                        <button className="change-number more-film">+</button>
                                        <span>{item.number*item.price} грн.</span>
                                        <button onClick={(e) => this.removeFromCart(item.id)}>Удалить</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    {cartItems.length > 0 && <p className="total-price">Итого: {totalPrice} грн.</p>}
                    {cartItems.length > 0 && <button className="order">Оформить заказ</button>}
                </div>
            </header>
        );
    }
}

const mapStateToProps = ({ cart }) => ({
    totalPrice: cart.items.reduce((total, item) => total + (item.price * item.number), 0),
    count: cart.items.length,
    cartItems: cart.items
});
  
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(cartActions, dispatch)
});
  
//   const mapDispatchToProps = dispatch => ({
//     ...bindActionCreators(filmsActions, dispatch),
//     ...bindActionCreators(filterActions, dispatch)
//   });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Menu);