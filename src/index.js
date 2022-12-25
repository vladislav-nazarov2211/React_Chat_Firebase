import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD7uBs5SIjj-6sH1Mbz1wBu3Xy0kH5_xvI",
  authDomain: "chat-react-fa945.firebaseapp.com",
  projectId: "chat-react-fa945",
  storageBucket: "chat-react-fa945.appspot.com",
  messagingSenderId: "778642492838",
  appId: "1:778642492838:web:6634147ceb0161f5589367",
  measurementId: "G-868Z9TSDTJ"
});
export const Context = createContext(null)
const auth = firebase.auth()
const firestore = firebase.firestore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
