// @flow
import type { Movie, Genre } from '../views/App/App.types';
import store from '../store';

export const remapGenres = ( movie: Movie, genres: Array<Genre>): Movie => {

  // get the genre list that we retrieved earlier from the api
  let _genresFromApi = genres || store.getState().AppReducer.genres.values;

  // initialise a new array in the movie object
  movie.genres = [];

  // mutative method to map over ids and match them 
  // to the corresponding genere from the api
  movie.genre_ids.forEach( id => {
    let genre = _genresFromApi.filter( genre => genre.id === id);
    movie.genres.push( genre[0].name )
  })

  return movie;
}