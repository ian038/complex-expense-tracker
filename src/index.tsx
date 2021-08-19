import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ExpenseTrackerProvider } from "./context/context";
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <React.StrictMode>
    <SpeechProvider appId="9a3cb16c-7ba7-49d7-9fe1-2e63ec55fa81" language="en-US">
      <ExpenseTrackerProvider>
        <App />
      </ExpenseTrackerProvider>
    </SpeechProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

