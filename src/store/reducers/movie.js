import * as actionTypes from '../actions/actionTypes';

const initialState = {
  movies: [],
  total: 0,
  loading: false,
  error: null,
  moviesCompletions: [],
}

const movieReducer = (state = initialState, action) => {
  const stateClone = {
    ...state
  };
  switch (action.type) {
    case actionTypes.FETCH_MOVIES: {
      stateClone.loading = true;
      break;
    }
    case actionTypes.FETCH_MOVIES_SUCCESS: {
      stateClone.loading = false;
      stateClone.movies = action.payload.movies;
      stateClone.total = action.payload.total;
      break;
    }
    case actionTypes.FETCH_MOVIES_ERROR: {
      stateClone.loading = false;
      stateClone.error = action.payload;
      break;
    }
    case actionTypes.FETCH_MOVIES_COMPLETION: {
      stateClone.loading = true;
      break;
    }
    case actionTypes.FETCH_MOVIES_COMPLETION_SUCCESS: {
      stateClone.loading = false;
      stateClone.moviesCompletions = action.payload.moviesCompletions;
      break;
    }
    case actionTypes.FETCH_MOVIES_COMPLETION_ERROR: {
      stateClone.loading = false;
      stateClone.error = action.payload;
      break;
    }
    default:
      ;
  }
  return stateClone;
};

export default movieReducer;