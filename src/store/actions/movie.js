import * as actionTypes from './actionTypes';
import api from '../../util/api';
import delay from '../../util/delay';
import { NotificationManager } from 'react-notifications';

// const baseUrl = "http://127.0.0.1:3000/api";
const baseUrl = "https://checkdc-movie.herokuapp.com/api";


export const fetchMovies = (query) => {
  return async (dispatch) => {
    dispatch(fetchMoviesStarted());
    try {
      const { movies, total } = await api.get(`${baseUrl}/movies`, {
        params: query
      });
      dispatch(fetchMoviesSuccess({
        movies,
        total
      }));

    } catch (error) {

      dispatch(fetchMoviesError(error));
      NotificationManager.error("Error occured while loading movies, please check your internet connection!")
    }
  }
};

export const fetchMoviesCompletions = (query) => {
  return async (dispatch) => {
    dispatch(fetchMoviesCompletionsStarted());

    try {
      
      const moviesCompletions = await api.get(`${baseUrl}/movies/completions`, {
        params: query
      });
      dispatch(fetchMoviesCompletionsSuccess({
        moviesCompletions
      }));

    } catch (error) {

      dispatch(fetchMoviesCompletionsError(error));
      NotificationManager.error("Error occured while searching, please check your internet connection!")

    }
  }
};

export const addCommentToMovie = (payload) => {
  return async (dispatch) => {
    dispatch(addCommentToMovieStarted(payload));

    try {
      
      await api.post(`${baseUrl}/movies/${payload.id}/comments`, {
        comment: payload.comment
      });
     

    } catch (error) {

      dispatch(fetchMoviesCompletionsError(error));
      NotificationManager.error("Error occured while adding comment, please check your internet connection!")
    }
  }
};


export const addCommentToMovieStarted = (payload) => {
  return {
    type: actionTypes.ADD_COMMENT_TO_MOVIE,
    payload
  };
};

export const fetchMoviesStarted = () => {
  return {
    type: actionTypes.FETCH_MOVIES
  };
};

export const fetchMoviesError = (error) => {
  return {
    payload: error,
    type: actionTypes.FETCH_MOVIES_ERROR
  };
};

export const fetchMoviesSuccess = (payload) => {
  return {
    payload,
    type: actionTypes.FETCH_MOVIES_SUCCESS
  };
};




export const fetchMoviesCompletionsStarted = () => {
  return {
    type: actionTypes.FETCH_MOVIES_COMPLETION
  };
};

export const fetchMoviesCompletionsError = (error) => {
  return {
    payload: error,
    type: actionTypes.FETCH_MOVIES_COMPLETION_ERROR
  };
};

export const fetchMoviesCompletionsSuccess = (payload) => {
  return {
    payload,
    type: actionTypes.FETCH_MOVIES_COMPLETION_SUCCESS
  };
};

