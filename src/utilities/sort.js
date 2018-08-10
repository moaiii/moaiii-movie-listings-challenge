// @flow
import type { Movie } from '../views/App/App.types';

var sortBy = require('lodash.sortby');

export const sortMoviesBy = (movies: Array<Movies>, 
  sortByKey: string): Array<Movies> => {

    return sortBy(movies, [sortByKey]).reverse();
}