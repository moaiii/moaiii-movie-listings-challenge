// @flow
import type { Movie, Genre } from './App.types';

type Action = {
  +type: string,
  +payload: Object
 };

type State = {
  movies: {
    values: Array<Movie>,
    pending: boolean,
    resolved: boolean,
    error: boolean
  },
  genres: {
    values: Array<Genre>,
    pending: boolean,
    resolved: boolean,
    error: boolean
  },
  minimumRating: number,
  genreFilters: Array<string>
};

let initialState: State = {
  movies: {
    values: [],
    pending: false,
    resolved: false,
    error: false
  },
  genres: {
    values: [],
    pending: false,
    resolved: false,
    error: false
  },
  minimumRating: 3,
  genreFilters: []
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {

    case "[APP] GET_MOVIES_NOW_PLAYING__PENDING": {
      return Object.assign({}, state, {
        movies: Object.assign({}, state.movies, {
          pending: true
        })
      });
    }

    case "[APP] GET_MOVIES_NOW_PLAYING__RESOLVED": {
      return Object.assign({}, state, {
        movies: Object.assign({}, state.movies, {
          values: action.payload,
          pending: false,
          resolved: true
        })
      });
    }

    case "[APP] GET_MOVIES_NOW_PLAYING__ERROR": {
      return Object.assign({}, state, {
        movies: Object.assign({}, state.movies, {
          values: action.payload,
          pending: false,
          resolved: false,
          error: true
        })
      });
    }

    case "[APP] GET_MOVIE_GENRES__PENDING": {
      return Object.assign({}, state, {
        genres: Object.assign({}, state.genres, {
          pending: true
        })
      });
    }

    case "[APP] GET_MOVIE_GENRES__RESOLVED": {
      return Object.assign({}, state, {
        genres: Object.assign({}, state.genres, {
          values: action.payload,
          pending: false,
          resolved: true
        })
      });
    }

    case "[APP] GET_MOVIE_GENRES__ERROR": {
      return Object.assign({}, state, {
        genres: Object.assign({}, state.genres, {
          values: action.payload,
          pending: false,
          resolved: false,
          error: true
        })
      });
    }

    case "[APP] SET_MINIMUM_RATING": {
      return Object.assign({}, state, {
        minimumRating: action.payload
      });
    }

    case "[APP] SET_GENRE_FILTERS": {
      return Object.assign({}, state, {
        genreFilters: action.payload
      });
    }

    default: {
      return state;
    }
  }
};
