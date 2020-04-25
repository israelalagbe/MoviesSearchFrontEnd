import {
    createStore,
    compose,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import movieReducer from './reducers/movie';
/* MiddleWare: logger */
const logger = store => {
    return next => {
        return action => {
            console.log('[middleWare]: dispatching', action);
            const result = next(action);
            console.log('[middleWare]: nextState', store.getState());
            return result;
        }
    }
}

const rootReducer = combineReducers({
    /**/
    movieReducer
});

export default createStore(rootReducer, applyMiddleware(logger, thunk));