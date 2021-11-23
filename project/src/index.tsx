import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { createApi } from './services/api';
import { checkAuthStatusAction, loadOffersAction } from './store/api-action';
import { AuthorizationStatus } from './const';
import { requireAuthorization } from './store/action';
import { redirect } from './store/middlewares/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { rootReducer } from './store/root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';


const api = createApi(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(loadOffersAction());
store.dispatch(checkAuthStatusAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter >
        <ToastContainer />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

