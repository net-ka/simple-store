import React, { Component } from 'react';
import './menu.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';
// import { setFilter } from '../../actions/filter';

class Menu extends Component {
    moreFilm() {
        // this.props.addToCart(film, 1);
    }

    render() {
        const { cartItems, totalPrice, count }  = this.props;
        return (
            <header>
                <h1>Магазин видеопластинок</h1>
                <div className="cart-wrapper">
                    <p>Итого: {totalPrice} грн.</p>
                    <button>Корзина ({count})</button>
                </div>

                <div className="cart">
                    <ul>
                        {cartItems.length === 0 && <li>Пока в вашей корзине пусто :(</li>}
                        {cartItems.length > 0 && cartItems.map(item => {
                            return (
                                <li key={item.id}>
                                    <span className="cart-titles">{item.title}</span>
                                    <div className="manage-number">
                                        <button className="change-number" onClick={(item) => this.lessFilm(item)}>-</button>
                                        <span>1</span>
                                        <button className="change-number" onClick={(item) => this.moreFilm(item)}>+</button>
                                        <button>Удалить</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </header>
        );
    }
}

const mapStateToProps = ({ cart }) => ({
    totalPrice: cart.items.reduce((total, item) => total + item.price, 0),
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