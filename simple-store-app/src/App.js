import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { setFilms } from './actions/films';

import './App.css';

import Menu from './components/menu/menu';
import FilmCards from './components/filmCard/filmCard';
import Footer from './components/footer/footer';

class App extends Component {
  componentWillMount() {
    const { setFilms } = this.props;

    fetch('./films.json')
        .then(response => response.json())
        .then(data => setFilms(data))
        .catch(error => error);
  }

  render() {
    const { films, isReady } = this.props;
    
    return (
      <Fragment>
        <Menu />
        <div className="content-wrapper">
          {!isReady ?
            <p>Загрузка...</p> 
            :
            <FilmCards films={films} />
          }
        </div>

        <Footer />
      </Fragment>
    )
  }
  
}

const mapStateToProps = ({ films }) => ({
  films: films.items,
  isReady: films.isReady
});

const mapDispatchToProps = dispatch => ({
  setFilms: films => dispatch(setFilms(films))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
