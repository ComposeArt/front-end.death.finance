import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
  SingleLineSeed,
  RenderSeedProps
} from 'react-brackets';
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
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import logoSmall from './images/logo-small.png';

import { NavLink } from "./NavLink";
import { PayloadContext, getBracketMatches } from "./utils/firebase";

export const SeasonTournament = (props: any) => {
  const toast = useToast();

  const [loading, setLoading]: any = useState(true);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');
  const seedColor = useColorModeValue('white', '#1A202C');

  const [matches, setMatches]: any = useState([]);

  const bracket = props.id;

  const { account } = useContext(PayloadContext);

  useEffect(() => {
    document.title = `${bracket} | Tournament | Season 0 | NFT Fight Club`;
  }, [bracket]);

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        const allMatches = await getBracketMatches(bracket);
        const roundMatches = _.chain(allMatches).groupBy((m: any) => {
          return m.round;
        }).map((v: any, k: any) => {
          let title = `${v.length * 2} Fighters`;

          if (v.length * 2 === 16) {
            title = 'Sweet 16';
          };

          if (v.length * 2 === 8) {
            title = 'Elite 8';
          };

          if (v.length * 2 === 4) {
            title = 'Final 4';
          };

          if (v.length * 2 === 2) {
            title = 'Grand Final';
          };

          return {
            title,
            seeds: v.map((m: any) => {
              return {
                id: m.id,
                player1: m.player1,
                player2: m.player2,
                score1: 0,
                score2: 0,
                rank1: m.rank1 + 1,
                rank2: m.rank2 + 1,
              }
            }),
          }
        }).value();

        setMatches(roundMatches);
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
      setLoading(false);
    })();
  }, [bracket]);

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
    <Container maxW='container.lg' centerContent overflowX="hidden">
      <Heading size='lg' marginTop={16} textAlign="center">
        Season 0 Tournament
      </Heading>
      <Text marginTop={4}>
        “let's talk about nft fight club”
      </Text>
      <Text fontSize={12} color="red.500" marginTop={4}>
        preseason starts {moment().to(moment('2022-02-10', 'YYYY-MM-DD'))}
      </Text>
      <Wrap
        width="100%"
        align="center"
        justify="center"
        spacing={8}
        marginTop={8}
      >
        <WrapItem>
          <NavLink to={`/season/0/tournament/alpha`}>alpha (bo1)</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink to={`/season/0/tournament/beta`}>beta (bo1)</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink to={`/season/0/tournament/gamma`}>gamma (bo1)</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink to={`/season/0/tournament/delta`}>delta (bo1)</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink to={`/season/0/tournament/zeta`}>zeta (bo3)</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink to={`/season/0/tournament/theta`}>theta (bo3)</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink to={`/season/0/tournament/sigma`}>sigma (bo5)</NavLink>
        </WrapItem>
        <WrapItem>
          <NavLink to={`/season/0/tournament/omega`}>omega (bo7)</NavLink>
        </WrapItem>
      </Wrap>
      <Center
        marginTop={12}
        width="100%"
        overflowX="scroll"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" justify="center" >
          <Bracket
            bracketClassName="tournament"
            rounds={matches}
            roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
              return (
                <Text textAlign="center" marginBottom={12}>
                  { title }
                </Text>
              );
            }}
            mobileBreakpoint={640}
            renderSeedComponent={({seed, breakpoint, roundIndex, seedIndex}: RenderSeedProps) => {
              console.log(roundIndex);

              const Wrapper = roundIndex === 2 ? SingleLineSeed : Seed;

              return (
                <Wrapper mobileBreakpoint={breakpoint}>
                  <VStack>
                    <Text opacity={0.5} fontSize={12} color={"white"}>
                      {seed.rank1 ? `${seed.rank1} vs ${seed.rank2}` : '-'}
                    </Text>
                    <Tooltip label={seed.label}>
                      <HStack
                        padding={2}
                        borderWidth={2}
                        borderColor={LineColor}
                        borderRadius={100}
                        onClick={() => {seed.block && navigate(`/season/0/matches/${seed.matchId}`)}}
                        _hover={{
                          cursor: seed.block ? 'pointer' : 'default',
                          borderColor: seed.block ? winnerColor : LineColor,
                        }}
                      >
                        <Box
                          borderRadius="40px"
                          borderColor={LineColor}
                          borderWidth={2}
                        >
                          <Image
                            boxSize="40px"
                            borderRadius="40px"
                            src={seed.player1.image_thumbnail_url || logoSmall}
                          />
                        </Box>
                        <Box>
                          <Text opacity={0.5}>
                            {seed.score1} - {seed.score2}
                          </Text>
                        </Box>
                        <Box
                          borderRadius="40px"
                          borderColor={LineColor}
                          borderWidth={2}
                        >
                          <Image
                            boxSize="40px"
                            borderRadius="40px"
                            src={seed.player2.image_thumbnail_url || logoSmall}
                          />
                        </Box>
                      </HStack>
                    </Tooltip>
                    <Text opacity={0.5} fontSize={12} color={seed.log ? "white" : "red.500"}>
                      {seed.block ? `block #${seed.block}` : '-'}
                    </Text>
                  </VStack>
                </Wrapper>
              );
            }}
          />
        </Box>
      </Center>
    </Container>
  );
};
