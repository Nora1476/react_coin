import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>

  // ThemeProvider는 styled-component의 하나의 컴포턴트 이며 속성으로 theme오브젝트 입력은 필수
  // ThemeProvider 자식 태그는 부모요소의 객체게 접근가능하다
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
