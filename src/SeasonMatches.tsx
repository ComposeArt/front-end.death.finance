import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  useToast,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useCollection } from 'react-firebase-hooks/firestore';

import { SeasonHeader } from "./SeasonHeader";

import { allMatchesQuery, latestMatchQuery } from "./utils/firebase";
import { Matches } from './Matches';

const prevBlocks: any = [];

export const SeasonMatches = (props: any) => {
  const toast = useToast();

  const [latestBlock, setLatestBlock]: any = useState('-');
  const [latestDocs]: any = useCollection(latestMatchQuery);
  const latestMatch = latestDocs ? (latestDocs?.docs.map((d: any) => d.data()))[0] : {};

  const [matchDocs, matchesLoading, matchesError] = useCollection(allMatchesQuery(latestBlock));
  const matches = matchDocs ? matchDocs?.docs.map((d: any) => d.data()) : [];

  const lastBlock = matches.length ? matches[matches.length - 1].block : '-';

  useEffect(() => {
    document.title = 'Matches | Season 0 | NFT Fight Club';
  }, []);

  useEffect(() => {
    if (!_.isEmpty(latestMatch) && latestBlock === '-') {
      setLatestBlock(latestMatch.block);
    }
  }, [latestMatch, latestBlock]);

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
      <Text
        fontSize={12}
        marginTop={8}
      >
        {latestBlock} - {lastBlock}
      </Text>
      <HStack marginTop={2} align="center" justify="center" spacing={8}>
        {prevBlocks.length && (
          <Text
            fontSize={12}
            opacity={0.5}
            _hover={{
              cursor: 'pointer',
              textDecoration: 'underline',
              opacity: 1,
            }}
            onClick={() => {
              setLatestBlock(prevBlocks[prevBlocks.length - 1]);
              prevBlocks.pop();
            }}
          >
            next 100
          </Text>
        )}
        <Text
          fontSize={12}
          opacity={0.5}
          _hover={{
            cursor: 'pointer',
            textDecoration: 'underline',
            opacity: 1,
          }}
          onClick={() => {
            prevBlocks.push(latestBlock);
            setLatestBlock(lastBlock);
          }}
        >
          prev 100
        </Text>
      </HStack>
      <Matches matches={matches} loading={matchesLoading} />
    </Container>
  );
};
