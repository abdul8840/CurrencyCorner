import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { store } from './app/store.js';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import './index.css';

const basename = import.meta.env.MODE === 'production' ? '/admin' : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter basename={basename}>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);