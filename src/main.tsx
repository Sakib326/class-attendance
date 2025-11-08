import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import AppRouter from "./router";
import { Provider } from "react-redux";
import "antd/dist/reset.css";
import "./styles/main.scss";
import { store } from "./appstore/store";

const antTheme = {
  token: {
    colorPrimary: "#0B3A5D",
    fontFamily: "Poppins, sans-serif",
    colorTextBase: "#364a63",
    fontSize: 14,
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={antTheme}>
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
