import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// Получение корневого элемента
const rootElement = document.getElementById("root");

// Проверка, что элемент существует
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

// Настройка метрик производительности
reportWebVitals();
