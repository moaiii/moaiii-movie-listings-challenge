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
import type { Movie as MovieType } from './App.types';

// COMPONENTS
import { Movie } from '../../components/Movie/Movie';
import { GenreSelector } from '../../components/GenreSelector/GenreSelector';
import { RatingSlider } from '../../components/RatingSlider/RatingSlider';

// UTILITIES
import { filterByRating, filterByGenre } from '../../utilities/filtering';
import { sortMoviesBy } from '../../utilities/sort';

// TYPES
type Props = {
  movies: Array<MovieType>,
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

    // Initial movie load from the api
    // this allows all movies to show initially.

    // The movies are passed finally to the sorting function 
    // to sort by popularity high to low.
    if( !this.state.moviesLoaded &&  nextProps.movies.values.length > 0) {
      this.setState({ 
        moviesFiltered: sortMoviesBy(nextProps.movies.values, 'popularity'),
        moviesLoaded: true
      })
    }

    // Check if we have a change in minimum rating or genre filters
    // if we do we will use the util functions to augment the array
    // of movies displayed. This is held in the App components state object.
    if(nextProps.minimumRating !== this.props.minimumRating
      || nextProps.genreFilters.length !== this.props.genreFilters.length) {

        let _filteredByRating
          = filterByRating( this.props.movies.values, nextProps.minimumRating );
        
        let _filteredByGenre 
          = filterByGenre( _filteredByRating, nextProps.genreFilters );

        this.setState({ 
          moviesFiltered: sortMoviesBy(_filteredByGenre, 'popularity')
        })
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

    let _content: React.Element<'div' | 'h1'>
      = movies.resolved && !movies.pending && !movies.error
        ? <div>
            <h1>Movie Listings Challenge</h1>
            <h3>Genre Selection</h3>
            { _genreSelector }
            <h3>Minimum Rating</h3>
            { _ratingSlider }
            <h3>Movie Results</h3>
            { _movies }
          </div>
        : <h1> Loading movies... </h1>;

    return (
      <div className={`App`}>
        { _content }
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