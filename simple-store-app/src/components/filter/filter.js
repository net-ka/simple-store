import React, { Component } from 'react';
import './filter.scss'

import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as filterActions from '../../actions/filter';
import { setFilter } from '../../actions/filter';

// const Filter = () => (
//         <section className="filter-wrapper">
//             <button>До 1970 года</button>
//             <button>После 1970 года</button>
//         </section>
// );

class Filter extends Component {
    state = {
        films: this.props.films,
        activeItem: "all"
    }

    handleClickFilter = (target) => {
        const name = target.name;
        const { setFilter } = this.props;

        this.setState({
            activeItem: {name}
        });

        setFilter(name);

        this.props.applyFilter();
    }


    render() {
        return(
            <section className="filter-wrapper">
                <button name="all" onClick={(e) => this.handleClickFilter(e.target)}>Все</button>
                <button name="before1970" onClick={(e) => this.handleClickFilter(e.target)}>До 1970 года</button>
                <button name="after1970" onClick={(e) => this.handleClickFilter(e.target)}>После 1970 года</button>
            </section>
        );
    }
}

// export default Filter

const mapStateToProps = ({ films }) => ({
    filterBy: films.filterBy
  });
  
  const mapDispatchToProps = dispatch => ({
    setFilter: films => dispatch(setFilter(films))
  });
  
//   const mapDispatchToProps = dispatch => ({
//     ...bindActionCreators(filmsActions, dispatch),
//     ...bindActionCreators(filterActions, dispatch)
//   });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Filter);
  