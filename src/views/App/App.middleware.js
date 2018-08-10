// @flow

import * as actions from './App.action';
import type {Action} from "../../utilities/redux";
import {networkRequest} from "../../utilities/networkRequest";
import { remapGenres } from '../../utilities/genres.js';

var path = require('path');
var lib = path.join(path.dirname(require.resolve('axios')),'lib/adapters/http');
var http = require(lib);

export default {
  "[APP] GET_MOVIES_NOW_PLAYING__SUBMIT": async (store, next, action: Action<string>) => {

    let _totalPages: number = 0;
    let _movies: Array<Object> = [];
    let _url: string = `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_NOW_PLAYING_URL}${process.env.REACT_APP_API_KEY}`;

    // The api provides pages to allow developers to easily create pagination
    // however for our purposes we need all data, this means chaining up to 40 
    // network requests. It would be handy if they provided an 'all' option.

    // initial request for page 1
    try {
      let res = await networkRequest({
        adapter: http,
        method: 'get',
        url: `${ _url }&page=1`
      });

      _totalPages = res.data.total_pages;
      _movies = res.data.results;
      
      // // susequent requests to get page 2 > totalnumofpages
      // for(let i=2; i <= _totalPages; i++) {
        
      //   try {
      //     let res = await networkRequest({
      //       method: 'get',
      //       url: `${ _url }&page=${ i }`
      //     });

      //     // map the results and push each movie to the array in 
      //     // in order to keep a one dimensional array for the component to use
      //     res.data.results.map( movie => _movies.push( movie ));

      //   } catch (error) {
      //     console.error(`[ERROR] getting page ${ i }`, error);
      //     store.dispatch(actions.getMoviesNowPlaying.rejected());
      //   }
      // }

      // remap the genre id to show the name instead for UI purposes
      // we could match the ID's when filtering the arrays but I want to show
      // the name in the movie component
      let _moviesWithRemappedGenreNames = _movies
        .map( movie => remapGenres( movie ));
      
      // now we have all movie data (40 x 40 array of movies)
      // dispatch this to the redux store for our components to digest
      store.dispatch(actions.getMoviesNowPlaying.resolved( _moviesWithRemappedGenreNames ));

    } catch (error) {
      console.error(`[ERROR] getting page 1`, error);
      store.dispatch(actions.getMoviesNowPlaying.rejected());
    }
  },

  
  "[APP] GET_MOVIE_GENRES__SUBMIT": async (store, next, action: Action<string>) => {
    let _url: string = `${process.env.REACT_APP_GENRE_URL}${process.env.REACT_APP_API_KEY}`;

    try {
      let res = await networkRequest({
        adapter: http,
        method: 'get',
        url: `${ _url }`
      });

      store.dispatch(actions.getMovieGenres.resolved( res.data.genres ));

    } catch(error) {
      console.error(`[ERROR] getting movie genres`, error);
      store.dispatch(actions.getMovieGenres.rejected());
    }
  }
}