import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  useToast,
} from "@chakra-ui/react";
import { useCollection } from 'react-firebase-hooks/firestore';

import { SeasonHeader } from "./SeasonHeader";

import { allMatchesQuery } from "./utils/firebase";
import { Matches } from './Matches';

export const SeasonMatches = (props: any) => {
  const toast = useToast();

  const [matchDocs, matchesLoading, matchesError] = useCollection(allMatchesQuery);
  const matches = matchDocs ? matchDocs?.docs.map((d: any) => d.data()) : [];

  useEffect(() => {
    document.title = 'Matches | Season 0 | NFT Fight Club';
  }, []);

  useEffect(() => {
    if (matchesError) {
      console.log(matchesError);
      toast({
        title: 'failed to load matches',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [matchesError, toast]);

  return (
    <Container maxW='container.lg' centerContent>
      <SeasonHeader />
      <Matches matches={matches} loading={matchesLoading} />
    </Container>
  );
};
