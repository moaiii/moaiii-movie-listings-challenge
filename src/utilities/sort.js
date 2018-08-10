// @flow
import type { Movie } from '../views/App/App.types';

var sortBy = require('lodash.sortby');

export const sortMoviesBy = (movies: Array<Movie>, 
  sortByKey: string): Array<Movie> => {

    return sortBy(movies, [sortByKey]).reverse();
}