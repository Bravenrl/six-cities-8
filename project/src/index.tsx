import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import { reviews } from './mocks/reviews';
import { createApi } from './services/api';
import { reducer } from './store/reducer';
import thunk from 'redux-thunk';

const api = createApi();
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api))));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App offers = {offers} reviews = {reviews}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
