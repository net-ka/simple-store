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
    isReady: this.props.isReadym,
    setFilms: this.props.setFilms
  }

  componentWillMount() {
    const { setFilms } = this.props;
    // const { setFilms } = this.state;

    fetch('./films.json')
        .then(response => response.json())
        .then(data => setFilms(data))
        .catch(error => error);
  }

  // componentDidMount() {
  //   const { films } = this.props;
  //   if (films) {
  //     this.setState({
  //       films: this.props.films
  //     });
  //     console.log("new state", films);
  //   }
    
  // }

  applyFilter(films) {
    // const { films } = this.props;
    console.log("new new state", films);
    
    if (films) {
      this.setState({
        films: films
      });
    };
  }

  render() {
    const { films, isReady } = this.props;
    // const { films, isReady } = this.state;

    // console.log("new state", films);
    
    return (
      <Fragment>
        <Menu />
        <div className="all-content-wrapper">
          {/* <Filter setFilter={setFilter} /> */}
          <Filter applyFilter={(films) => this.applyFilter(films)}/>
          <div className="content-wrapper">
            {!isReady ?
              <p>Загрузка...</p> 
              :
              <FilmCards films={films} />
            }
          </div>
        </div>

        <Footer />
      </Fragment>
    )
  }
  
}

const filter = (films, filterBy) => {
  switch (filterBy) {
    case 'all':
      return films;
    case 'before1970':
      return films.filter(item => item.year <= 1970);
    case 'after1970':
      return films.filter(item => item.year > 1970);;
    default:
      return films;
  };
}

const mapStateToProps = ({ films }) => ({
  // films: films.items,
  films: filter(films.items, films.filterBy),
  isReady: films.isReady
});

// const mapDispatchToProps = dispatch => ({
//   setFilms: films => dispatch(setFilms(films))
// });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(filmsActions, dispatch),
  ...bindActionCreators(filterActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
