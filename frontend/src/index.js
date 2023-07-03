

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dashboard from './Components/Dashboard/Dashboard';
import Topic from './Components/Topic/Topic';
import Login from './Components/Login/Login';

import {store} from './app/store';
import {Provider} from 'react-redux';
import {
  createBrowserRouter,
  Routes,Route, BrowserRouter
} from "react-router-dom";


const condition = true; // Condition for importing CSS file



import('./index.css');
    
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

