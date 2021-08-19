import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ExpenseTrackerProvider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider>
      <ExpenseTrackerProvider>
        <App />
      </ExpenseTrackerProvider>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

