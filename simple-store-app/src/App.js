import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as filmsActions from './actions/films';
import * as filterActions from './actions/filter';
// import { setFilms } from './actions/films';

import './App.css';

import Menu from './components/menu/menu';
import Filter from './components/filter/filter';
import FilmCards from './components/filmCard/filmCard';
import Footer from './components/footer/footer';

class App extends Component {
  state = {
    films: null,
    isReady: this.props.isReady,
    setFilms: this.props.setFilms
  }

  componentWillMount() {
    const { setFilms } = this.props;

    fetch('./films.json')
        .then(response => response.json())
        .then(data => setFilms(data))
        .catch(error => error);
  }

  render() {
    const { films, isReady, filteredItems, setFilter } = this.props;

    return (
      <Fragment>
        <Menu />
        <div className="all-content-wrapper">
          <Filter setFilter={setFilter} films={films} />
          <div className="content-wrapper">
            {!isReady && <p>Загрузка...</p>}
            {isReady && filteredItems && <FilmCards films={filteredItems} />}
            {isReady && !filteredItems && <FilmCards films={films} />}
          </div>
        </div>

        <Footer />
      </Fragment>
    )
  }
  
}


const mapStateToProps = ({ films }) => ({
  films: films.items,
  isReady: films.isReady,
  filteredItems: films.filterBy.filteredItems
});

// const mapDispatchToProps = dispatch => ({
//   setFilms: films => dispatch(setFilms(films))
// });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(filmsActions, dispatch),
  ...bindActionCreators(filterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
