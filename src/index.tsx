import React from "react";
import ReactDOM from "react-dom/client";
import App from './App'
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material";

// Получение корневого элемента
const rootElement = document.getElementById("root");

const theme = createTheme({
  palette: {
    primary: {
      main: '#eee',
    },
    secondary: {
      main: '#262244'
    }
  },
  typography: {
    fontFamily: 'monospace',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: 0 
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'secondary.main'
        }
      }
    }
  }
})


// Проверка, что элемент существует
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

// Настройка метрик производительности
reportWebVitals();
