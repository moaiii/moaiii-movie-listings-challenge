// @flow
import {actionCreator, networkActionCreator} from "../../utilities/redux";
import type {NetworkActionCreator, ActionCreator} from "../../utilities/redux";

export const getMoviesNowPlaying: NetworkActionCreator<any, void> 
  = networkActionCreator("[APP] GET_MOVIES_NOW_PLAYING");

export const getMovieGenres: NetworkActionCreator<any, void> 
  = networkActionCreator("[APP] GET_MOVIE_GENRES");

export const setMinimumRating: ActionCreator<string> 
  = actionCreator("[APP] SET_MINIMUM_RATING");

export const setGenreFilters: ActionCreator<string> 
  = actionCreator("[APP] SET_GENRE_FILTERS");