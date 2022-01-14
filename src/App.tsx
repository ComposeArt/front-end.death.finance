import React from "react";
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { Router } from "@reach/router";
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { NotFound } from "./NotFound";
import { Footer } from "./Footer";
import { Subheader } from "./Subheader";
import { Header } from "./Header";
import { Home } from "./Home";

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: true,
  fonts: {
    heading: 'Fira Mono',
    body: 'Fira Mono',
  },
});

const Nav = (props: any) => (
  <ChakraProvider theme={theme}>
    <Header />
    <Subheader />
    {props.children}
    <Footer />
  </ChakraProvider>
);

export const App = () => (
  <Router>
    <Nav path="/">
      <NotFound default />
      <Home path="/" />
    </Nav>
  </Router>
);
