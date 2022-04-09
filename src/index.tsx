import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend as Backend } from 'react-dnd-html5-backend';
import { AppSateProvider } from './state/AppStateContext';

ReactDOM.render(
  <React.StrictMode>
    <AppSateProvider>
      <DndProvider backend={Backend}>
        <App />
      </DndProvider>
    </AppSateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

