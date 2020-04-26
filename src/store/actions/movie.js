import * as actionTypes from './actionTypes';
import api from '../../util/api';

const baseUrl = "http://127.0.0.1:3000/api";
export const fetchMovies = (query={}) => {
    return async (dispatch) => {
      dispatch(fetchMoviesStarted());
      try {
        const {movies, total} = await api.get(`${baseUrl}/movies`)
        dispatch(fetchMoviesSuccess({
            movies,
            total
        }));
      } catch (error) {
        dispatch(fetchMoviesError(error));
      }
    }
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


