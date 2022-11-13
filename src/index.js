import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom/client';


import { RouterProvider } from 'react-router-dom';
import { router } from './App';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer autoClose={3000}/>
    <RouterProvider router={ router } />
  </React.StrictMode>
);