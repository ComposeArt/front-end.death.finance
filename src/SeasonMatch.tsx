import React, { useEffect, useState, useContext } from "react";
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
  Center,
  Image,
  Button,
} from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";
import { navigate } from "@reach/router";

import { FighterPortrait, FighterStats } from './Fighter';
import { matchReporter } from "./utils/fighting";
import { getMatch, RemoteChainPayloadContext } from "./utils/firebase";

const Fighters = ({ fighter1, fighter2, fighter1Winner, fighter2Winner}: any) => {
  return (
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
  );
};

const MatchLog = ({ report, fighter1, fighter2 }: any) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');

  return (
    <>
      <Heading size='md' marginTop={12} textAlign="center" lineHeight={1.5} marginBottom={8}>
        Match Log
      </Heading>
      <VStack width="100%" justify="center" align="center" spacing={4}>
        {report.map((r: any, key: number) => {
          const player = r.turn === '0' ? fighter1 : fighter2;

          if (r.turn === '0') {
            return (
              <HStack
                key={key}
                width="100%"
                justify="flex-start"
                align="center"
                borderColor={lineColor}
                padding={6}
                spacing={8}
              >
                <Center width="40px">
                  <Image
                    boxSize={{ base: "32px" }}
                    borderRadius={{ base: "32px" }}
                    minWidth="32px"
                    src={player.image_thumbnail_url}
                  />
                </Center>
                <Center textAlign="left">
                  <Text fontSize={12} fontWeight={400} color="blue.500">
                    {_.split(r.log, '|').map((w: any, i: number) => {
                      return i % 2 ? <span style={{ fontWeight: 900 }} key={i}>{w}</span> : <span key={i}>{w}</span>
                    })}
                  </Text>
                </Center>
              </HStack>
            );
          } else {
            return (
              <HStack
                key={key}
                width="100%"
                justify="flex-end"
                align="center"
                borderColor={lineColor}
                padding={6}
                spacing={8}
              >
                <Center textAlign="right">
                  <Text fontSize={12} fontWeight={400} color="red.500">
                    {_.split(r.log, '|').map((w: any, i: number) => {
                      return i % 2 ? <span style={{ fontWeight: 900 }} key={i}>{w}</span> : <span key={i}>{w}</span>
                    })}
                  </Text>
                </Center>
                <Center width="40px">
                  <Image
                    boxSize={{ base: "32px" }}
                    borderRadius={{ base: "32px" }}
                    src={player.image_thumbnail_url}
                    minWidth="32px"
                  />
                </Center>
              </HStack>
            );
          }
        })}
      </VStack>
    </>
  );
};

export const SeasonMatch = (props: any) => {
  const toast = useToast();


  const winnerColor = useColorModeValue('gray.800', 'white');

  const matchId = props.id;

  const [loading, setLoading]: any = useState(true);
  const [match, setMatch]: any = useState({});
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { blockNumber } = useContext(RemoteChainPayloadContext);

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

  const inBlocks = match.block ? parseInt(match.block, 10) - parseInt(blockNumber, 10) : 0;

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center" lineHeight={1.5}>
        {!match.log ? 'Waiting Match Results' : 'Match Results'}
      </Heading>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Randomness
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {match.randomness || '-'}
      </Text>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Block
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {match.block} {inBlocks > 0 ? `(${inBlocks})` : ''}
      </Text>
      <Fighters
        fighter1={fighter1}
        fighter1Winner={fighter1Winner}
        fighter2={fighter2}
        fighter2Winner={fighter2Winner}
      />
      {match.log && (
        <MatchLog
          report={report}
          fighter1={fighter1}
          fighter2={fighter2}
        />
      )}
      <Button
        marginTop={16}
        leftIcon={<FaRandom />}
        onClick={() => {
          let route = `/simulator?c1=${fighter1.collection}&p1=${fighter1.token_id}&c2=${fighter2.collection}&p2=${fighter2.token_id}`;

          if (match.block) {
            route = `${route}&b=${match.block}`;
          }

          if (match.randomness) {
            route = `${route}&r=${match.randomness}`;
          }

          navigate(route);
        }}
      >
        simulate
      </Button>
    </Container>
  );
};
