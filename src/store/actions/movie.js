import * as actionTypes from './actionTypes';

export const fetchMovies = (query={}) => {
    return dispatch => {
      dispatch(fetchMoviesStarted());
      try {
          
        dispatch(fetchMoviesSuccess({
            movies: [1,2,4],
            total: 5
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


