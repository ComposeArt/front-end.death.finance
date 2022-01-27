import React, { useEffect, useState } from "react";
import _ from "lodash";
import {
  Container,
  HStack,
  Box,
  useToast,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";
import { navigate } from "@reach/router";

import { FighterPortrait, FighterStats } from './Fighter';
import { matchReporter } from "./utils/fighting";
import { getMatch } from "./utils/firebase";

export const SeasonMatch = (props: any) => {
  const toast = useToast();

  // const LineColor = useColorModeValue('gray.500', 'white.500');
  // const winnerColor = useColorModeValue('gray.800', 'white');

  const matchId = props.id;

  const [loading, setLoading]: any = useState(true);
  const [match, setMatch]: any = useState({});
  const [errorLoading, setErrorLoading]: any = useState(false);

  useEffect(() => {
    (async function getInitialData() {
      if (matchId) {
        setLoading(true);
        try {
          const result = await getMatch(matchId);

          if (result) {
            setMatch(result);
          } else {
            navigate('/season/0/matches')
          }
        } catch (error) {
          console.log(error);
          setErrorLoading(true);
        }
        setLoading(false);
      }
    })();
  }, [matchId]);

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

  console.log(match);

  const report =  match.log ? matchReporter({
    match: match.log,
    fighter1: match.player1,
    fighter2: match.player2,
  }) : [];

  console.log(report);

  let fighter1Winner = false;
  let fighter2Winner = false;

  if (!_.isEmpty(report)) {
    if (report[report.length - 1].winner === '0') {
      fighter1Winner = true;
    } else {
      fighter2Winner = true;
    }
  }

  const name1 = `${match.collection1} #${match.player1 ? _.truncate(match.player1.token_id, { length: 7 }) : '0'}`;
  const name2 = `${match.collection2} #${match.player2 ? _.truncate(match.player2.token_id, { length: 7 }) : '0'}`;

  useEffect(() => {
    document.title = `${name1} vs ${name2}`;
  }, [name1, name2]);

  const fighter1 = {
    ...match.player1,
    owner: match.owner1,
  };

  const fighter2 = {
    ...match.player2,
    owner: match.owner2,
  };

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center" lineHeight={1.5}>
        {!match.log ? 'Waiting Match Results' : 'Match Results'}
      </Heading>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Block {match.block}
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Randomness {match.randomness || '-'}
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Winner {fighter1Winner ? name1 : (fighter2Winner ? name2 : '-')}
      </Text>
      <HStack marginTop={12} align="flex-start" spacing={8}>
        <VStack>
          <FighterPortrait fighter={fighter1} winner={fighter1Winner} />
          <FighterStats fighter={fighter1} />
        </VStack>
        <Box
          display='flex'
          height={{ base: "100px", md: 150 }}
          justifyContent="center"
          alignItems="center"
          opacity={0.5}
        >
          <RiSwordFill size={24} />
        </Box>
        <VStack>
          <FighterPortrait fighter={fighter2} winner={fighter2Winner} />
          <FighterStats fighter={fighter2} />
        </VStack>
      </HStack>
    </Container>
  );
};
