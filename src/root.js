import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { CssBaseline, createTheme, MuiThemeProvider } from "@material-ui/core";
import App from "./app";
import { AuthProvider } from "./contexts";

const theme = createTheme({
  typography: {
    useNextVariants: true,
  },

  extend: {
    drawerWidth: 280,
  },
});

function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <GlobalStyle />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}`;

export default Root;
