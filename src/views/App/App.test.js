import * as actions from './App.action';
import store from '../../store';

describe('setMinimumRating App action', () => {
  it('correctly sets the value in the store', async () => {
    expect.assertions(1);
    await store.dispatch(actions.setMinimumRating(5));
    let _state = store.getState().AppReducer.minimumRating
    expect( _state ).toEqual( 5 )
  })
});

describe('getMovieGenres App action', () => {
  it('gets an array of genresfrom the server', async () => {
    expect.assertions(1);
    await store.dispatch(actions.getMovieGenres.submit());
    let _genres = store.getState().AppReducer.genres.values
    expect( _genres.length ).toBeGreaterThan( 0 );
  })
});

describe('getMoviesNowPlaying App action', () => {
  it('gets an array of movies from the server', async () => {
    expect.assertions(1);
    await store.dispatch(actions.getMoviesNowPlaying.submit());
    let _movies = store.getState().AppReducer.movies.values
    expect( _movies.length ).toBeGreaterThan( 0 );
  })
});