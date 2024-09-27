import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../theme";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";

export default function MainLayout() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Styled>
          <Navbar />
          <Outlet />
        </Styled>
      </ThemeProvider>
    </>
  );
}

const Styled = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;
