import React, { Component, Fragment } from 'react';
import './filmCard.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cartActions from '../../actions/cart';
import * as favoritesActions from '../../actions/favorites';

import nonFavorite from './images/non-favorite.png';
import favorite from './images/favorite.png';

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
        const { items } = this.props;

        if (items) {
            if(items.some(item => item.id === id)) {
                // alert('Товар уже добавлен в корзину. Вы можете изменить его количество в корзине.');
                // console.log(film.id, film.number + 1);
                const addNumberItem = items.filter(item => item.id === id)[0];
                this.props.changeCartNumber(addNumberItem.id, addNumberItem.number + 1);
                return;
            }
        } 
        this.props.addToCart(film, 1);
    }

    addedToFavoritesFilm(film, id) {
        if (this.props.favorites) {
            if(this.props.favorites.some(item => item.id === id)) {
                this.props.removeFromFavorites(id);
                return;
            }
        } 
        this.props.addToFavorites(film);
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
                            <img className="film-img" src={film.image} alt={film.title} />
                            <p className="film-title">{film.title}</p>
                            <p>{film.year} год</p>
                            <p>{film.price} грн.</p>
                            <div className="do-btns-wrapper">
                                <button id="film-add-to-cart" onClick={() => this.addedToCartFilm(film, film.id)}>В корзину</button>
                                {!this.props.favorites.some(item => item.id === film.id)  && <img className="favorites-btn" onClick={() => this.addedToFavoritesFilm(film, film.id)} src={nonFavorite} alt="Добавить в избранное" />}
                                {this.props.favorites.some(item => item.id === film.id)  && <img className="favorites-btn" onClick={() => this.addedToFavoritesFilm(film, film.id)} src={favorite} alt="Удалить из избранного" />}
                            </div>
                            {/* {!this.props.favorites.some(item => item.id === film.id)  && <button className="favorites-btn" onClick={() => this.addedToFavoritesFilm(film, film.id)}>В избранное</button>}
                            {this.props.favorites.some(item => item.id === film.id)  && <button className="favorites-btn added-favorites" onClick={() => this.addedToFavoritesFilm(film, film.id)}>Избранное</button>} */}
                        </li>
                    ))}
                </ul>

                <div className="pages-wrapper">
                    { prev !== 0 && <button className="prev" onClick={() => this.changePagePrev()}>&lt;</button>}
                    { prev === 0 && <button className="prev hidden">&lt;</button>}
                    <p className="current">{current}</p>
                    { filmEnd < films.length && <button className="next" onClick={() => this.changePageNext()}>&gt;</button>}
                    { filmEnd >= films.length && <button className="next hidden">&gt;</button>}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ cart, favorites }) => ({
    items: cart.items,
    favorites: favorites.items
});
  
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(cartActions, dispatch),
  ...bindActionCreators(favoritesActions, dispatch)
});
  
//   const mapDispatchToProps = dispatch => ({
//     ...bindActionCreators(filmsActions, dispatch),
//     ...bindActionCreators(filterActions, dispatch)
//   });
  
export default connect(mapStateToProps, mapDispatchToProps)(FilmCards);
// export default FilmCards