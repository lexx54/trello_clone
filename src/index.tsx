import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { AppSateProvider } from './state/AppStateContext';

ReactDOM.render(
  <React.StrictMode>
    <AppSateProvider>
      <App />
    </AppSateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

