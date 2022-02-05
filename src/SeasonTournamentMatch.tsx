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
  Button,

} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";

import { FighterPortrait, FighterStats } from './Fighter';
import { matchReporter } from "./utils/fighting";
import { PayloadContext, getTournamentMatch, getMatchFights } from "./utils/firebase";

export const SeasonTournamentMatch = (props: any) => {
  const toast = useToast();

  const [loading, setLoading]: any = useState(true);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('#1A202C', 'white');

  const [match, setMatch]: any = useState({});
  const [activeMatch, setActiveMatch]: any = useState(0);

  const [report, setReport]: any = useState([]);

  const bracket = props.id;
  const matchId = props.matchId;

  const { account, season } = useContext(PayloadContext);

  console.log(season);

  useEffect(() => {
    document.title = `${bracket} ${matchId} | Tournament | Season 0 | NFT Fight Club`;
  }, [bracket, matchId]);

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        const result = await getTournamentMatch(bracket, matchId);

        if (result) {
          const fights = await getMatchFights(bracket, matchId);

          result.fights = fights;
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


  useEffect(() => {
    (async function getInitialData() {
      if (!_.isEmpty(match)) {
        const onMatch = _.find(match.fights, (m, i) => i === activeMatch) || {};

        if (onMatch.log) {
          const result = matchReporter({
            match: onMatch.log,
            fighter1: match.fighter1.player,
            fighter2: match.fighter2.player,
          });

          setReport(result);
        } else {
          setReport([]);
        }
      }
    })();
  }, [match, activeMatch]);

  const title = `${bracket} round ${parseInt(match.round, 10) + 1}`;
  let fighter1Winner = false;
  let fighter2Winner = false;

  if (!_.isEmpty(report)) {
    if (report[report.length - 1].winner === '0') {
      fighter1Winner = true;
    } else {
      fighter2Winner = true;
    }
  }

  const fighter1 = {
    ..._.omit(match.fighter1, 'player'),
    ..._.get(match.fighter1, 'player', {}),
    betting: match.betting1 || '0.0',
  };

  const fighter2 = {
    ..._.omit(match.fighter2, 'player'),
    ..._.get(match.fighter2, 'player', {}),
    betting: match.betting2 || '0.0',
  };

  const onMatch = _.find(match.fights, (m, i) => i === activeMatch) || {};

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center" lineHeight={1.5}>
        {title}
      </Heading>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        best of {match.best_of}
      </Text>
      <Wrap
        width="100%"
        align="center"
        justify="center"
        spacing={8}
        marginTop={6}
        marginBottom={4}
      >
        {!_.isEmpty(match) && match.fights.map((m: any, i: any) => {
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
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Randomness
      </Text>
      {onMatch.log && (
        <Text marginTop={2} fontSize={12} textAlign="center">
          {onMatch.randomness || '-'}
        </Text>
      )}
      {!onMatch.log && (
        <Text color="red" opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
          waiting match results
        </Text>
      )}
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Block
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {onMatch.block || '-'}
      </Text>
      <HStack marginTop={12} align="flex-start" spacing={8}>
        <VStack>
          <FighterPortrait fighter={fighter1} winner={fighter1Winner} />
          <Box
            padding={2}
            borderWidth={1}
            borderColor={winnerColor}
            borderRadius={100}
          >
            <Text
              fontSize={{ base: 10, md: 12 }}
              opacity={1}
            >
              {fighter1.betting} Ξ
            </Text>
          </Box>
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
          <Box
            padding={2}
            borderWidth={1}
            borderColor={winnerColor}
            borderRadius={100}
          >
            <Text
              fontSize={{ base: 10, md: 12 }}
              opacity={1}
            >
              {fighter2.betting} Ξ
            </Text>
          </Box>
          <FighterStats fighter={fighter2} />
        </VStack>
      </HStack>
      {onMatch.log && (
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
                    borderColor={LineColor}
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
                    borderColor={LineColor}
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
      )}
      <Button
        marginTop={16}
        leftIcon={<FaRandom />}
        onClick={() => {
          let route = `/simulator?c1=${fighter1.collection}&p1=${fighter1.token_id}&c2=${fighter2.collection}&p2=${fighter2.token_id}`;

          if (onMatch.block) {
            route = `${route}&b=${onMatch.block}`;
          }

          if (onMatch.randomness) {
            route = `${route}&r=${onMatch.randomness}`;
          }

          navigate(route);
        }}
      >
        simulate
      </Button>
    </Container>
  );
};
