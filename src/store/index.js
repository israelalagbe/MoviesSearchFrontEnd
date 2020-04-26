import {
    createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar'
import thunk from 'redux-thunk';
import movieReducer from './reducers/movie';

/* MiddleWare: logger */
const logger = store => {
    return next => {
        return action => {
            console.log('[middleWare]: dispatching', action);
            const result = next(action);
            return result;
        }
    }
}

const rootReducer = combineReducers({
    movie: movieReducer,
    loadingBar: loadingBarReducer,
});

export default createStore(rootReducer, applyMiddleware(logger, thunk));