import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { Router } from "@reach/router";
import { useEthers, ChainId } from "@usedapp/core";
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { NotFound } from "./NotFound";
import { Footer } from "./Footer";
import { Subheader } from "./Subheader";
import { Header } from "./Header";
import { Home } from "./Home";
import { Simulator } from "./Simulator";
import { Simulation } from "./Simulation";
import { Profile } from "./Profile";

import { PayloadContext, getCollections, getFighters } from "./utils/firebase";

const theme = extendTheme({
  initialColorMode: 'dark',
  // useSystemColorMode: true,
  fonts: {
    heading: 'Fira Mono',
    body: 'Fira Mono',
  },
  styles: {
    global: {
      '.identicon': {
        borderRadius: '50%',
      },
    },
  },
});

const ScrollToTop = ({ children, location }: any) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

const Nav = (props: any) => {
  const [collections, setCollections]: any = useState([]);
  const [fighters, setFighters]: any = useState([]);
  const { account, chainId } = useEthers();
  const chain = chainId && ChainId[chainId];

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
          chain,
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
  <Router primary={false}>
    <ScrollToTop path="/">
      <Nav path="/">
        <NotFound default />
        <Home path="/" />
        <Simulator path="/simulator" />
        <Simulation path="/simulator/:simulation" />
        <Profile path="/profile" />
        <Profile path="/profile/:address" />
      </Nav>
    </ScrollToTop>
  </Router>
);
