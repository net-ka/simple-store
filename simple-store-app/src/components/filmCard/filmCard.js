import React, { Component, Fragment } from 'react';
import './filmCard.scss'

// const FilmCards = ({ films, isReady }) => (
    // <ul className="films-wrapper">
    //     {films.map(film => (
    //             <div className="film-card-wrapper">
    //                 <img src={film.image} alt={film.title} />
    //                 <p className="film-title">{film.title}</p>
    //                 <p>{film.year} год</p>
    //                 <p>{film.price} грн.</p>
    //             </div>
    //     ))}
    //     </ul>
        
// );

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

    render() {
        const { prev, current} = this.state;
        const { films } = this.props;
        const filmStart = 10 * prev;
        const filmEnd = 10 * current;
        const currentFilmList = films.slice(filmStart, filmEnd);

        return (
            <Fragment>
                <ul className="films-wrapper">
                    {currentFilmList.map(film => (
                        <li key={film.id} className="film-card-wrapper">
                            <img src={film.image} alt={film.title} />
                            <p className="film-title">{film.title}</p>
                            <p>{film.year} год</p>
                            <p>{film.price} грн.</p>
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

export default FilmCards