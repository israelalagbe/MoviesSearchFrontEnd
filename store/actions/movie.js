import * as actionTypes from './ActionTypes';

export const fetchMovies = (query={}) => {
    return dispatch => {
      dispatch(fetchMoviesStarted());
      try {
          
        dispatch(fetchMoviesSuccess([]));
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
        error,
        type: actionTypes.FETCH_MOVIES_ERROR
    };
};

export const fetchMoviesSuccess = (movies) => {
    return {
        payload: movies,
        type: actionTypes.FETCH_MOVIES_SUCCESS
    };
};


