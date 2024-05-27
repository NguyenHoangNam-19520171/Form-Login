import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/index.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./assets/fonts/fontawesome/css/all.min.css";
import LoginPage from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import toast, { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      
        <React.StrictMode>

          <Routes>
            <Route path="/*" element={<App />}/>
            <Route path="/login" element={ <LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        
        </React.StrictMode>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  <Toaster />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
