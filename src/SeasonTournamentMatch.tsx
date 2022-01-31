import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Heading,
  Container,
  HStack,
  Image,
  Box,
  Text,
  useColorModeValue,
  useToast,
  Wrap,
  WrapItem,
  Center,
  VStack,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri";

import { FighterPortrait, FighterStats } from './Fighter';

import { PayloadContext, getTournamentMatch } from "./utils/firebase";

export const SeasonTournamentMatch = (props: any) => {
  const toast = useToast();

  const [loading, setLoading]: any = useState(true);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('#1A202C', 'white');

  const [match, setMatch]: any = useState({});
  const [activeMatch, setActiveMatch]: any = useState(0);

  const bracket = props.id || 'alpha';
  const matchId = props.matchId;

  const { account } = useContext(PayloadContext);

  useEffect(() => {
    document.title = `Match ${bracket} ${matchId} | Tournament | Season 0 | NFT Fight Club`;
  }, [bracket]);

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        const result = await getTournamentMatch(bracket, matchId);

        if (result) {
          setMatch(result);
        }else {
          navigate('/season/0/tournament');
        }
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
      setLoading(false);
    })();
  }, [bracket, matchId]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load match',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  console.log(match);

  const title = `${bracket} round ${parseInt(match.round, 10) + 1}`;
  const fighter1Winner = false;
  const fighter2Winner = false;

  const fighter1 = {
    ..._.omit(match.fighter1, 'player'),
    ..._.get(match.fighter1, 'player', {}),
  };

  const fighter2 = {
    ..._.omit(match.fighter2, 'player'),
    ..._.get(match.fighter2, 'player', {}),
  };

  const onMatch = _.find(match.matches, (m, i) => i === activeMatch) || {};

  console.log(onMatch);

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center" lineHeight={1.5}>
        {title}
      </Heading>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        seed {match.rank1 + 1} vs  seed {match.rank2 + 1}
      </Text>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        best of {match.best_of}
      </Text>
      <Wrap
        width="100%"
        align="center"
        justify="center"
        spacing={8}
        marginTop={8}
      >
        {!_.isEmpty(match) && match.matches.map((m: any, i: any) => {
          return (
            <WrapItem key={i}>
              <Box
                onClick={() => {setActiveMatch(i)}}
                opacity={activeMatch === i ? 1 : 0.5}
                _hover={{
                  borderColor: winnerColor,
                  cursor: 'pointer',
                  opacity: 1,
                  textDecoration: 'underline'
                }}
              >
                <Text fontSize={14}>
                  match {i + 1}
                </Text>
              </Box>
            </WrapItem>
          );
        })}
      </Wrap>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Block
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {onMatch.block}
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Randomness
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {onMatch.randomness || '-'}
      </Text>
      {!onMatch.log && (
        <Text color="red" opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
          waiting match results
        </Text>
      )}
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
