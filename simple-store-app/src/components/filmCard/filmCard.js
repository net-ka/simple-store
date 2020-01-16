import React, { Component, Fragment } from 'react';
import './filmCard.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';

class FilmCards extends Component {
    state = {
        prev: 0,
        current: 1
    }

    changePageNext() {
        this.setState(prevState => ({
            prev: prevState.prev + 1,
            current: prevState.current + 1
        }));
    }

    changePagePrev() {
        this.setState(prevState => ({
            prev: prevState.prev - 1,
            current: prevState.current - 1
        }));
    }

    addedToCartFilm(film, id) {
        if (this.props.items) {
            if(this.props.items.some(item => item.id === id)) {
                alert('Товар уже добавлен в корзину. Вы можете изменить его количество в корзине.');
                return;
            }
        } 
        this.props.addToCart(film, 1);
    }

    render() {
        const { prev, current} = this.state;
        const { films } = this.props;
        const filmStart = 10 * prev;
        const filmEnd = 10 * current;
        const currentFilmList = films.slice(filmStart, filmEnd);

        // const addedCount = cart.items.reduce((count, film) => count + (film.id === id ? 1 : 0), 0)

        return (
            <Fragment>
                <ul className="films-wrapper">
                    {currentFilmList.map(film => (
                        <li key={film.id} className="film-card-wrapper">
                            <img src={film.image} alt={film.title} />
                            <p className="film-title">{film.title}</p>
                            <p>{film.year} год</p>
                            <p>{film.price} грн.</p>
                    <button id="film-add-to-cart" onClick={() => this.addedToCartFilm(film, film.id)}>Добавить в корзину</button>
                        </li>
                    ))}
                </ul>

                <div className="pages-wrapper">
                    { prev !== 0 && <button className="prev" onClick={() => this.changePagePrev()}>&lt;</button>}
                    { prev === 0 && <button className="prev hidden">&lt;</button>}
                    <p className="current">{current}</p>
                    { filmEnd < films.length && <button className="next" onClick={this.props.addToCart}>&gt;</button>}
                    { filmEnd >= films.length && <button className="next hidden">&gt;</button>}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ cart }) => ({
    items: cart.items
});
  
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(cartActions, dispatch)
});
  
//   const mapDispatchToProps = dispatch => ({
//     ...bindActionCreators(filmsActions, dispatch),
//     ...bindActionCreators(filterActions, dispatch)
//   });
  
export default connect(mapStateToProps, mapDispatchToProps)(FilmCards);
// export default FilmCards