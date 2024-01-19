//추가해준 타입정의를 import
import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "#f5f6fa",
  accentColor: "#8c7ae6",
  buttonColor: "#2f3640",
  borderColor: "#f5f5f5",
};

export const lightTheme: DefaultTheme = {
  bgColor: "#ecf0f1",
  textColor: "#2d3436",
  accentColor: "#d35400",
  buttonColor: "#2f3640",
  borderColor: "#f5f5f5",
};

export const theme = {
  lightTheme,
  darkTheme,
};

export default theme;
