import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import { ThemeProvider } from "styled-components";
import styled, { createGlobalStyle } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { isDarkAtom } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

//렌더링 될때 스타일 컴포넌트를 전역 스코프르 올려줌
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700;800;900&display=swap');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
  }
*{
  box-sizing: border-box;
}
body {
  line-height: 1;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  position:relative;
  min-width: 840px;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a{
  text-decoration: none;
  color:#2d3436
}
.apexcharts-canvas > svg {
    /* background-color: transparent !important; */
    border-radius: 12px;
}
`;

const BtnTheme = styled.div`
  width: 80px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 15px;
  position: fixed;
  left: 20px;
  bottom: 20px;
  cursor: pointer;
  span {
    display: block;
  }
`;

function App() {
  const setDakrAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDakrAtom((prev) => !prev);
  const isDark = useRecoilValue(isDarkAtom);
  //router 렌더링
  return (
    // ThemeProvider는 styled-component의 하나의 컴포턴트 이며 속성으로 theme오브젝트 입력은 필수
    // ThemeProvider 자식 태그는 부모요소의 객체게 접근가능하다
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <>
        <GlobalStyle />
        <RouterProvider router={Router} />;
        <ReactQueryDevtools initialIsOpen={true} />
        <BtnTheme>
          <span onClick={toggleDarkAtom} className="material-symbols-outlined">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </BtnTheme>
      </>
    </ThemeProvider>
  );
}

export default App;
