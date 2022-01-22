import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { Router, globalHistory } from "@reach/router";
import { useEthers, ChainId } from "@usedapp/core";
import { QueryParamProvider } from 'use-query-params';
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { NotFound } from "./NotFound";
import { Footer } from "./Footer";
import { Subheader } from "./Subheader";
import { Header } from "./Header";
import { Home } from "./Home";
import { FAQ } from "./FAQ";
import { Simulator } from "./Simulator";
import { Simulation } from "./Simulation";
import { ProfileFighters, ProfileMatches } from "./Profile";
import { SeasonFighters } from "./SeasonFighters";
import { SeasonMatches } from "./SeasonMatches";
import { SeasonRules } from "./SeasonRules";
import { SeasonFighter } from "./SeasonFighter";

import { PayloadContext, getCollections } from "./utils/firebase";

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
  const { account, chainId } = useEthers();
  const chain = chainId && ChainId[chainId];

  useEffect(() => {
    (async function getInitialData() {
      const collectionsData = await getCollections();

      setCollections(collectionsData);
    })();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <PayloadContext.Provider
        value={{
          collections,
          account: account ? account.toLowerCase() : null,
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
    <QueryParamProvider {...{ path: '/' }} reachHistory={globalHistory}>
      <ScrollToTop path="/">
        <Nav path="/">
          <NotFound default />
          <Home path="/" />
          <FAQ path="/faq" />
          <Simulator path="/simulator" />
          <Simulation path="/simulator/:simulation" />
          <ProfileFighters path="/profile" />
          <ProfileFighters path="/profile/:address" />
          <ProfileMatches path="/profile/:address/matches" />
          <SeasonRules path="/season/0" />
          <SeasonFighters path="/season/0/fighters" />
          <SeasonMatches path="/season/0/matches" />
          <SeasonFighter path="/season/0/fighters/:id" />
        </Nav>
      </ScrollToTop>
    </QueryParamProvider>
  </Router>
);
