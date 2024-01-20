//추가해준 타입정의를 import
import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "#f5f6fa",
  accentColor: "#8c7ae6",
  buttonColor: "#2f3640",
  borderColor: "#ecf0f1",
};

export const lightTheme: DefaultTheme = {
  bgColor: "#ecf0f1",
  textColor: "#2d3436",
  accentColor: "#b33939",
  buttonColor: "#a4b0be",
  borderColor: "#2f3542",
};

export const theme = {
  lightTheme,
  darkTheme,
};

export default theme;
