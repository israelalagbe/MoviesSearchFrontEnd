import * as actionTypes from './ActionTypes';

export const fetchMovies = (query={}) => {
    return dispatch => {
      dispatch(fetchMoviesStarted());
      try {
          
        dispatch(fetchMoviesSuccess({
            movies: [],
            total: 0
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


