import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react";
import { Router, globalHistory } from "@reach/router";
import { useEthers, ChainId } from "@usedapp/core";
import { QueryParamProvider } from 'use-query-params';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { NotFound } from "./NotFound";
import { Footer } from "./Footer";
import { Subheader } from "./Subheader";
import { Header } from "./Header";
import { Home } from "./Home";
import { FAQ } from "./FAQ";
import { Chaos } from "./Chaos";
import { Rewards } from "./Rewards";
import { Simulator } from "./Simulator";
import { Simulation } from "./Simulation";
import { ProfileFighters, ProfileMatches } from "./Profile";
import { SeasonFighters } from "./SeasonFighters";
import { SeasonCollections } from "./SeasonCollections";
import { SeasonMatches } from "./SeasonMatches";
import { SeasonRules } from "./SeasonRules";
import { SeasonTournament } from "./SeasonTournament";
import { SeasonTournamentMatch } from "./SeasonTournamentMatch";
import { SeasonCollection, SeasonCollectionFighters, SeasonCollectionMatches } from "./SeasonCollection";
import { SeasonFighter, SeasonFighterMatches } from "./SeasonFighter";
import { SeasonMatch } from "./SeasonMatch";

import {
  PayloadContext,
  RemoteChainPayloadContext,
  chainQuery,
  remoteCreateUser,
  userQuery,
  seasonQuery,
  collectionsQuery,
} from "./utils/firebase";

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
  const [userLocal, setUserLocal]: any = useState({});
  const { account, chainId } = useEthers();
  const chain = chainId && ChainId[chainId];

  const [userDoc, userLoading, userError] = useDocument(userQuery(account ? account.toLowerCase() : 'missing'));
  const user = userDoc?.data() || {};

  const [seasonDoc, seasonLoading, seasonError] = useDocument(seasonQuery);
  const season = seasonDoc?.data() || {};

  const [chainDoc, chainLoading, chainError] = useDocument(chainQuery);
  const remoteChain: any = chainDoc?.data() || {};

  const [collectionDocs, collectionsLoading, collectionsError] = useCollection(collectionsQuery);
  const collections: any = collectionDocs ? collectionDocs?.docs.map((d: any) => d.data()) : [];

  useEffect(() => {
    (async function getInitialData() {
      if (account && _.isEmpty(user)) {
        await remoteCreateUser(account.toLowerCase());
      }
    })();
  }, [account, user]);

  return (
    <ChakraProvider theme={theme}>
      <PayloadContext.Provider
        value={{
          collections,
          season,
          account: account ? account.toLowerCase() : null,
          chain,
          user,
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
          <Rewards path="/rewards" />
          <Simulator path="/simulator" />
          <Simulation path="/simulator/:simulation" />
          <ProfileFighters path="/profile" />
          <ProfileFighters path="/profile/:address" />
          <ProfileMatches path="/profile/:address/matches" />
          <SeasonRules path="/season/0/rules" />
          <SeasonFighters path="/season/0/fighters" />
          <SeasonCollections path="/season/0/collections" />
          <SeasonMatches path="/season/0/matches" />
          <SeasonMatch path="/season/0/matches/:id" />
          <SeasonFighter path="/season/0/fighters/:id" />
          <SeasonFighterMatches path="/season/0/fighters/:id/matches" />
          <SeasonCollection path="/season/0/collections/:id" />
          <SeasonCollectionFighters path="/season/0/collections/:id/fighters" />
          <SeasonCollectionMatches path="/season/0/collections/:id/matches" />
          <SeasonTournament path="/season/0" />
          <SeasonTournament path="/season/0/tournament" />
          <SeasonTournament path="/season/0/tournament/:id" />
          <SeasonTournamentMatch path="/season/0/tournament/:id/:matchId" />
        </Nav>
      </ScrollToTop>
    </QueryParamProvider>
  </Router>
);
