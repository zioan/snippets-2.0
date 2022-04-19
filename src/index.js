import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import { SnippetProvider } from './context/SnippetContext';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <UserProvider>
    <SnippetProvider>
      <App />
    </SnippetProvider>
  </UserProvider>
);
