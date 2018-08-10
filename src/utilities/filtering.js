// @flow
import type { Movie } from '../views/App/App.types';

export const filterByGenre = ( movies: Array<Movie>, 
  genreFilters: Array<string> ): Array<Movie> => {

    // init the object to be returned
    let _filteredMovies = [];

    // turn the genre filters into a set so we can check the subset 
    // validity more easily
    let _genreFiltersAsSet = new Set( genreFilters );

    if(genreFilters.length === 0) {
      // let all pass through as there are no filters set
      return movies;
    
    } else {
      // the filtered genres array must be a subset of 
      // the movie objects genres array which was remapped in the middleware
      // debugger;

      movies.forEach( movie => {
        let _moviesGenresAsSet = new Set( movie.genres );
        
        // check that all the movies genres are a superset of the genres
        // specified by the users input. Meaning all genres in the filters
        // are included in the movie own list of genres
        if( isSuperset( _moviesGenresAsSet, _genreFiltersAsSet) ) {
          _filteredMovies.push(movie)
        }
      })

      return _filteredMovies;
    }

}

export const filterByRating = ( movies: Array<Movie>, 
  rating: number ): Array<Movie> => {

    // defensive approach to catch any rougue numbers passing through
    // which are out of range
    if( rating >= 0 && rating <= 10) {
      return movies.filter( movie => movie.vote_average >= rating)
    } else {
      return movies;
    }
}


function isSuperset(set, subset) {
  for (var elem of subset) {
      if (!set.has(elem)) {
          return false;
      }
  }
  return true;
}