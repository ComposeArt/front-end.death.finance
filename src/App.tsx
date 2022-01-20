import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { Router } from "@reach/router";
import { useEthers } from "@usedapp/core";
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { NotFound } from "./NotFound";
import { Footer } from "./Footer";
import { Subheader } from "./Subheader";
import { Header } from "./Header";
import { Home } from "./Home";
import { Simulator } from "./Simulator";
import { Simulation } from "./Simulation";

import { PayloadContext, getCollections, getFighters } from "./utils/firebase";

const theme = extendTheme({
  initialColorMode: 'dark',
  // useSystemColorMode: true,
  fonts: {
    heading: 'Fira Mono',
    body: 'Fira Mono',
  },
});

const Nav = (props: any) => {
  const [collections, setCollections]: any = useState([]);
  const [fighters, setFighters]: any = useState([]);
  const { account } = useEthers();

  useEffect(() => {
    (async function getInitialData() {
      const collectionsData = await getCollections();
      const fightersData = await getFighters();

      setCollections(collectionsData);
      setFighters(fightersData);
    })();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <PayloadContext.Provider
        value={{
          collections,
          fighters,
          account,
        }}
      >
        <Header />
        <Subheader />
        {props.children}
        <Footer />
      </PayloadContext.Provider>
    </ChakraProvider>
  );
};

export const App = () => (
  <Router>
    <Nav path="/">
      <NotFound default />
      <Home path="/" />
      <Simulator path="/simulator" />
      <Simulation path="/simulator/:simulation" />
    </Nav>
  </Router>
);
