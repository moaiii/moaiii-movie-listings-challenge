// @flow
import type { Movie } from '../views/App/App.types';
// $FlowFixMe Flowtyped cant find this types for the node_module
var sortBy = require('lodash.sortby');

export const sortMoviesBy = (movies: Array<Movie>, 
  sortByKey: string): Array<Movie> => {

    return sortBy(movies, [sortByKey]).reverse();
}