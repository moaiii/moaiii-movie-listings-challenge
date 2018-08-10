// @flow
// NODE MODULES
import * as React from "react";

// REDUX
import store from "../../store";
import { 
  getMoviesNowPlaying, 
  getMovieGenres,
  setMinimumRating,
  setGenreFilters } from './App.action';
import { connect } from "react-redux";
import type { movies } from './App.types';

// COMPONENTS
import { Movie } from '../../components/Movie/Movie';
import { GenreSelector } from '../../components/GenreSelector/GenreSelector';
import { RatingSlider } from '../../components/RatingSlider/RatingSlider';

// UTILITIES
import { filterByRating, filterByGenre } from '../../utilities/filtering';

// TYPES
type Props = {
  movies: Array<Movies>,
  genres: Array<Genre>
};

type State = {
  animateClass: string
};

// COMPONENT
class App extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      moviesFiltered: [],
      moviesLoaded: false
    };
  }

  // CLASS FUNCTIONS

  async componentDidMount(): void {
    // call the TMDB api and load genre list and movies into the redux store

    // if we had routes and the app component had the potential to be mounted 
    // serveral times as the user navigated through the app - we would do 
    // a check to see if the movies have already loaded and then bypass this 
    // set, just retrieving from the store.
    // However in this simple case this will suffice
    await store.dispatch(getMovieGenres.submit());
    await store.dispatch(getMoviesNowPlaying.submit());
  }

  componentWillReceiveProps(nextProps: Props): void {

    // initial movie load from the api
    // this allows all movies to show initially
    if( !this.state.moviesLoaded &&  nextProps.movies.values.length > 0) {
      this.setState({ 
        moviesFiltered: nextProps.movies.values,
        moviesLoaded: true
      })
    }

    // check if we have a change in minimum rating or genre filters
    // if we do we will use the util functions to augment the array
    // of movies displayed. This is held in the App components state object
    if(nextProps.minimumRating !== this.props.minimumRating
      || nextProps.genreFilters.length !== this.props.genreFilters.length) {

        let _filteredByRating
          = filterByRating( this.props.movies.values, nextProps.minimumRating );
        
        let _filteredByGenre 
          = filterByGenre( _filteredByRating, nextProps.genreFilters );

        this.setState({ moviesFiltered: _filteredByGenre })
      }

  }

  setSelectedGenre = ( genres: Array<string> ): void => {
    store.dispatch(setGenreFilters(genres));
  }

  handleRatingSliderChange = (value: number): void => {
    store.dispatch(setMinimumRating(value));
  }

  render(): React.Element<"div"> {
    // VARIABLES
    const { movies, genres } = this.props;
    const { moviesFiltered } = this.state;

    // private components
    let _movies: Array<React.Element<'div'>> 
      = moviesFiltered.map( (movie, i) => {
        return <Movie key={`${i}-movie`} movie={movie} />
      });

    let _genreSelector: React.Element<'div'>
      = <GenreSelector
          options={genres.values}
          selected={[]}
          onSelect={( genre ) => this.setSelectedGenre( genre )} />

    let _ratingSlider: React.Element<'div'>
      = <RatingSlider onChange={this.handleRatingSliderChange}/>

    return (
      <div className={`App`}>
        { _genreSelector }
        { _ratingSlider }
        { _movies }
      </div>
    );
  }
}

const storeToProps = ( store: Object ): Object => {
  return {
    movies: store.AppReducer.movies,
    genres: store.AppReducer.genres,
    minimumRating: store.AppReducer.minimumRating,
    genreFilters: store.AppReducer.genreFilters
  }
}

export default connect( storeToProps )( App );