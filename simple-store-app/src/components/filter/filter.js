import React, { Component } from 'react';
import './filter.scss'

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as filterActions from '../../actions/filter';
import { setFilter } from '../../actions/filter';
import * as favoritesActions from '../../actions/favorites';

// const Filter = () => (
//         <section className="filter-wrapper">
//             <button>До 1970 года</button>
//             <button>После 1970 года</button>
//         </section>
// );

class Filter extends Component {
    state = {
        activeItem: "all"
    }

    handleClickFilter = (target) => {
        const allFilterBtns = document.querySelectorAll('.filter-btn');
        allFilterBtns.forEach(item => item.classList.remove('active-btn'));
        target.classList.add('active-btn');

        const name = target.name;
        const { setFilter, films } = this.props;

        this.setState({
            activeItem: {name}
        });

        const filter = (films, name) => {
            switch (name) {
              case 'all':
                return films;
              case 'before1970':
                return films.filter(item => item.year <= 1970);
              case 'after1970':
                return films.filter(item => item.year > 1970);
              case 'favorites':
                return this.props.favorites;
              default:
                return films;
            };
          }

        const newItems = filter(films, name);

        setFilter(name, newItems);
    }


    render() {
        return(
            <section className="filter-wrapper">
                <button className="filter-btn active-btn" name="all" onClick={(e) => this.handleClickFilter(e.target)}>Все</button>
                <button className="filter-btn" name="favorites" onClick={(e) => this.handleClickFilter(e.target)}>Избранное</button>
                <button className="filter-btn" name="before1970" onClick={(e) => this.handleClickFilter(e.target)}>До 1970 года</button>
                <button className="filter-btn" name="after1970" onClick={(e) => this.handleClickFilter(e.target)}>После 1970 года</button>
            </section>
        );
    }
}

// export default Filter

// const mapStateToProps = ({ films }) => ({
//     filterBy: films.filterBy
//   });
  
//   const mapDispatchToProps = dispatch => ({
//     setFilter: films => dispatch(setFilter(films))
//   });

const mapStateToProps = ({ films, favorites }) => ({
    films: films.items,
    favorites: favorites.items
  });
  
  const mapDispatchToProps = dispatch => ({
    setFilter: (filter, filteredItems) => dispatch(setFilter(filter, filteredItems)),
    // ...bindActionCreators(favoritesActions, dispatch)
  });
  
//   const mapDispatchToProps = dispatch => ({
//     ...bindActionCreators(filmsActions, dispatch),
//     ...bindActionCreators(filterActions, dispatch)
//   });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Filter);
  