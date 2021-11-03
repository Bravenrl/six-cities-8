import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/app/app';
import { createApi } from './services/api';
import thunk from 'redux-thunk';
import { ThunkAppDispatch } from './types/action';
import { checkAuthStatusAction, loadOffersAction } from './store/api-action';
import { AuthorizationStatus } from './const';
import { requireAuthorization } from './store/action';
import { redirect } from './store/middlewares/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rootReducer } from './store/root-reducer';

const api = createApi(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

(store.dispatch as ThunkAppDispatch)(loadOffersAction());
(store.dispatch as ThunkAppDispatch)(checkAuthStatusAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
