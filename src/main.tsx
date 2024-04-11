import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NT4Provider } from '@frc-web-components/react';

import "./globals.css"
//    <NT4Provider address="localhost">

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
