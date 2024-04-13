import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NT4Provider } from '@frc-web-components/react';

import "./globals.css"
import { DragDropContext, useWidgetDragDrop } from './app/widgets/hooks/useWidgetDragDrop';
import { AppWrapper } from './AppWrapper';
//    

// rio: 10.35.6.2
// roborio-3506-frc.local
// radio: 10.35.6.2

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <NT4Provider address="localhost">
      <AppWrapper />
    </NT4Provider>
  </React.StrictMode>
)
