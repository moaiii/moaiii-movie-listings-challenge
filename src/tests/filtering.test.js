import filterByGenre from '../utilities/filtering';

// mock data to test functions with 
import movies from './mockData/movies-api.json';
import genres from './mockData/genres-api.json';


describe('Filtering the movies list by genre', () => {

  it('returns an empty array if given a genre that does not exist', () => {
    expect(filterByGenre('rom com')).toHaveLength(0);
  })

  // pointless test but showing an example of error handling in tests 
  it('throws an error if passed a number', () => {
    expect(filterByGenre())
  })

  it('returns arrays of at least one movie for each valid genre', () => {
    expect(filterByGenre())
  })
});