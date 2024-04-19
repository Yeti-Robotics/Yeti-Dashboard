import React from 'react';
import ReactDOM from 'react-dom/client';

import "./globals.css"
import { AppWrapper } from './AppWrapper';
//    

// rio: 10.35.6.2
// roborio-3506-frc.local
// radio: 10.35.6.2

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
      <AppWrapper />
  </React.StrictMode>
)
