import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { reviews } from './mocks/reviews';
import { createApi } from './services/api';
import { reducer } from './store/reducer';
import thunk from 'redux-thunk';
import { ThunkAppDispatch } from './types/action';
import { checkAuthStatusAction, loadOffersAction } from './store/api-action';
import { AuthorizationStatus } from './const';
import { requireAuthorization } from './store/action';

const api = createApi(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))),
);

(store.dispatch as ThunkAppDispatch)(loadOffersAction());
(store.dispatch as ThunkAppDispatch)(checkAuthStatusAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App reviews={reviews} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
