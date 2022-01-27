import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  useToast,
} from "@chakra-ui/react";

import { SeasonHeader } from "./SeasonHeader";

import { getAllMatches } from "./utils/firebase";
import { Matches } from './Matches';

export const SeasonMatches = (props: any) => {
  const toast = useToast();

  const [loading, setLoading]: any = useState(true);
  const [matches, setMatches]: any = useState([]);
  const [errorLoading, setErrorLoading]: any = useState(false);

  useEffect(() => {
    document.title = 'Matches | Season 0 | NFT Fight Club';
  }, []);

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        const allMatches = await getAllMatches();
        const orderedMatches = _.sortBy(allMatches, (m: any) => parseInt(m.block, 10));

        setMatches(orderedMatches);
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load matches',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  return (
    <Container maxW='container.lg' centerContent>
      <SeasonHeader />
      <Matches matches={matches} loading={loading} />
    </Container>
  );
};
