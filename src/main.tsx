import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App/App";
import { store } from "./store";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./styling/themeConfig";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={darkTheme}>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
