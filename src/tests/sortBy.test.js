import { sortMoviesBy } from '../utilities/sort';

// mock data to test functions with 
import movies from './mockData/movies-api.json';

describe('Sorting a list of movies', () => {
  it('orders the list from most to least popular', () => {

    let _listSorted = sortMoviesBy(movies, 'popularity');

    _listSorted.forEach( (movie, i) => {
      // run the assertion from the second item in the array to avoid 
      // looking for the -1 index
      if( i > 1) {
        expect(movie.popularity)
          .toBeLessThanOrEqual(_listSorted[i - 1].popularity);
      }
    })
  })
});