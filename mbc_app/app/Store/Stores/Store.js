import { 
    createStore, 
    combineReducers,
    compose, 
    applyMiddleware, 
} from 'redux';
import thunk from 'redux-thunk';

import VideoReducer from '../Reducers/VideoReducer';

const rootReducer = combineReducers({
    video: VideoReducer
});

let composeEnhancers = compose;

if( __DEV__ ){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
}

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;