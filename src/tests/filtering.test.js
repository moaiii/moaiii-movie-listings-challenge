import {filterByGenre, filterByRating} from '../utilities/filtering';

// mock data to test functions with 
import movies from './mockData/movies-api.json';
// import genres from './mockData/genres-api.json';


describe('Filtering the movies list by genre', () => {
  it('returns an empty array if given a genre that does not exist', () => {
    expect(filterByGenre(movies, ['rom com'])).toHaveLength( 0 );
  })

  it('returns arrays of at least one movie for each valid genre', () => {
    expect(filterByGenre(movies, ['Action', 'Adventure']).length)
      .toBeGreaterThan( 2 )
  })

  it('returns the array unfiltered if no genre filters are set', () => {
    expect(filterByGenre(movies, []).length)
      .toEqual( movies.length )
  })

  it('returns 6 movies if science fiction is selected filter genre', () => {
    expect(filterByGenre(movies, ["Science Fiction"]).length)
      .toEqual( 6 )
  })

  // In a real world example I would defend against this by casting everything
  // to lowercase to avoid this problem
  it('returns 0 as the filter is case sensitive', () => {
    expect(filterByGenre(movies, ["SciEnce fIction"]).length)
      .toEqual( 0 )
  })
});

describe('Filtering the movies list by rating', () => {
  it('should not return a movie with rating lower than specified (e.g. 8)', () => {
    let _filteredMovies = filterByRating(movies, 8);

    _filteredMovies.forEach( movie => {
      expect(movie).toBeGreaterThanOrEqual( 8 )
    })
  })

  it('should return the array unfiltered if the range is out of bounds (13, -1)', () => {
    expect(filterByRating(movies, -1)).toHaveLength( movies.length );
    expect(filterByRating(movies, 13)).toHaveLength( movies.length );
  })
})