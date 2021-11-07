import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store/store'
import { QueryParamProvider } from 'use-query-params';
import { StyledEngineProvider } from '@mui/material/styles';
ReactDOM.render(
  <Provider store={store}>
    <QueryParamProvider>
    <StyledEngineProvider injectFirst>
    <App />
    </StyledEngineProvider>
    </QueryParamProvider>
  </Provider>,

  document.getElementById('root')
);


