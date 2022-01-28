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
import { Chaos } from "./Chaos";
import { Grims } from "./Grims";
import { Simulator } from "./Simulator";
import { Simulation } from "./Simulation";
import { ProfileFighters, ProfileMatches } from "./Profile";
import { SeasonFighters } from "./SeasonFighters";
import { SeasonCollections } from "./SeasonCollections";
import { SeasonMatches } from "./SeasonMatches";
import { SeasonRules } from "./SeasonRules";
import { SeasonTournament } from "./SeasonTournament";
import { SeasonCollection, SeasonCollectionFighters, SeasonCollectionMatches } from "./SeasonCollection";
import { SeasonFighter, SeasonFighterMatches } from "./SeasonFighter";
import { SeasonMatch } from "./SeasonMatch";

import { PayloadContext, RemoteChainPayloadContext, getCollections, getSeason, streamChain } from "./utils/firebase";

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
      '.tournament': {
        justifyContent: 'center',
      }
    },
  },
});

const ScrollToTop = ({ children, location }: any) => {
  React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return children;
};

const Nav = (props: any) => {
  const [collections, setCollections]: any = useState([]);
  const [season, setSeason]: any = useState([]);
  const [remoteChain, setRemoteChain]: any = useState({});
  const { account, chainId } = useEthers();
  const chain = chainId && ChainId[chainId];

  useEffect(() => {
    let chainListener: any;

    (async function getInitialData() {
      const collectionsData = await getCollections();
      const seasonDta = await getSeason();

      chainListener = streamChain((data: any) => {
        setRemoteChain(data);
      });

      setCollections(collectionsData);
      setSeason(seasonDta);
    })();

    if (chainListener) {
      return () => {
        chainListener();
      };
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <PayloadContext.Provider
        value={{
          collections,
          season,
          account: account ? account.toLowerCase() : null,
          chain,
        }}
      >
        <RemoteChainPayloadContext.Provider
          value={remoteChain}
        >
          <Header />
          <Subheader />
          {props.children}
          <Footer />
        </RemoteChainPayloadContext.Provider>
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
          <Chaos path="/chaos" />
          <Grims path="/grims" />
          <Simulator path="/simulator" />
          <Simulation path="/simulator/:simulation" />
          <ProfileFighters path="/profile" />
          <ProfileFighters path="/profile/:address" />
          <ProfileMatches path="/profile/:address/matches" />
          <SeasonRules path="/season/0" />
          <SeasonFighters path="/season/0/fighters" />
          <SeasonCollections path="/season/0/collections" />
          <SeasonMatches path="/season/0/matches" />
          <SeasonMatch path="/season/0/matches/:id" />
          <SeasonFighter path="/season/0/fighters/:id" />
          <SeasonFighterMatches path="/season/0/fighters/:id/matches" />
          <SeasonCollection path="/season/0/collections/:id" />
          <SeasonCollectionFighters path="/season/0/collections/:id/fighters" />
          <SeasonCollectionMatches path="/season/0/collections/:id/matches" />
          <SeasonTournament path="/season/0/tournament" />
          <SeasonTournament path="/season/0/tournament/:id" />
        </Nav>
      </ScrollToTop>
    </QueryParamProvider>
  </Router>
);
