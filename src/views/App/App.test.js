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

describe('setGenreFilters App action', () => {
  it('correctly sets the value in the store', async () => {
    expect.assertions(1);
    await store.dispatch(actions.setGenreFilters( ['Comedy'] ));
    let _genres = store.getState().AppReducer.genreFilters;
    expect( _genres.length ).toEqual( 1 );
  })
  
  it('correctly sets the multiple valuesvalue in the store', async () => {
    expect.assertions(1);
    await store.dispatch(actions.setGenreFilters( ['Comedy', 'Action'] ));
    let _genres = store.getState().AppReducer.genreFilters;
    expect( _genres.length ).toEqual( 2 );
  })
});