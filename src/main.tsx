import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import '@mantine/core/styles.css'
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import Routers from "./router";

const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Routers />
      <ColorSchemeScript defaultColorScheme='auto' />
    </MantineProvider>
  </React.StrictMode>,
);
