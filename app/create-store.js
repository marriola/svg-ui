import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import app from 'reducers/app';

let reducers = {
    app
};

export default function(data) {
    var reducer = combineReducers(reducers);
    var store = createStore(reducer, data, window.devToolsExtension ? window.devToolsExtension() : f => f);
    return store
}
