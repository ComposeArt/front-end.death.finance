import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Bracket,
  Seed,
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
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import logoSmall from './images/logo-small.png';

import { NavLink } from "./NavLink";
import { PayloadContext, getBracketMatches } from "./utils/firebase";
import { SeasonHeader } from "./SeasonHeader";

export const SeasonTournament = (props: any) => {
  const toast = useToast();

  const [loading, setLoading]: any = useState(true);
  const [errorLoading, setErrorLoading]: any = useState(false);
  const [slide, setSlide]: any = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('#1A202C', 'white');

  const [matches, setMatches]: any = useState([]);

  const bracket = props.id || 'alpha';

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
            title: {
              bracket: title,
              best_of: v[0].best_of,
            },
            seeds: v.map((m: any) => {
              return {
                id: m.id,
                bracket: m.bracket,
                fighter1: m.fighter1,
                fighter2: m.fighter2,
                score1: 0,
                score2: 0,
                rank1: m.rank1 + 1,
                rank2: m.rank2 + 1,
                best_of: m.best_of,
                matches: m.matches,
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

  const rounds = _.times(matches.length, String);

  return (
    <Container maxW='container.lg' centerContent overflowX="hidden">
      <SeasonHeader />
      <Wrap
        width="100%"
        align="center"
        justify="center"
        spacing={8}
        marginTop={8}
      >
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'alpha'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/alpha`);
              setSlide(0);
            }}
            opacity={bracket === 'alpha' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              alpha
            </Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'beta'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/beta`);
              setSlide(0);
            }}
            opacity={bracket === 'beta' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              beta
            </Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'gamma'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/gamma`);
              setSlide(0);
            }}
            opacity={bracket === 'gamma' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              gamma
            </Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'delta'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/delta`);
              setSlide(0);
            }}
            opacity={bracket === 'delta' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              delta
            </Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'zeta'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/zeta`);
              setSlide(0);
            }}
            opacity={bracket === 'zeta' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              zeta
            </Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'theta'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/theta`);
              setSlide(0);
            }}
            opacity={bracket === 'theta' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              theta
            </Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'sigma'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/sigma`);
              setSlide(0);
            }}
            opacity={bracket === 'sigma' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              sigma
            </Text>
          </Box>
        </WrapItem>
        <WrapItem>
          <Box
            padding={2}
            borderWidth={1}
            borderColor={bracket === 'omega'  ? winnerColor : LineColor}
            borderRadius={100}
            onClick={() => {
              navigate(`/season/0/tournament/omega`);
              setSlide(0);
            }}
            opacity={bracket === 'omega' ? 1 : 0.5}
            _hover={{
              borderColor: winnerColor,
              cursor: 'pointer',
              opacity: 1,
            }}
          >
            <Text fontSize={14}>
              omega
            </Text>
          </Box>
        </WrapItem>
      </Wrap>
      {isMobile && (
        <HStack
          width="100%"
          height="30px"
          align="center"
          justify="center"
          spacing={4}
          marginTop={8}
        >
          {rounds.map((r: any, i: any) => {
            return (
              <Box
                key={i}
                borderRadius={100}
                bg={bgColor}
                width="14px"
                height="14px"
                opacity={i === slide ? 1 : 0.5}
                onClick={() => {setSlide(i)}}
              />
            );
          })}
        </HStack>
      )}
      <Center
        marginTop={8}
        width="100%"
        overflowX="scroll"
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" justify="center" >
          <Bracket
            bracketClassName="tournament"
            rounds={matches}
            roundTitleComponent={(title: any, roundIndex: number) => {
              return (
                <Box textAlign="center" marginBottom={4}>
                  <Text>
                    {`Round ${roundIndex + 1}`}
                  </Text>
                  <Text fontSize={12} opacity={0.5}>
                    { title.bracket }
                  </Text>
                  <Text fontSize={12} opacity={0.5}>
                    best of {title.best_of}
                  </Text>
                </Box>
              );
            }}
            mobileBreakpoint={640}
            renderSeedComponent={({seed, breakpoint, roundIndex, seedIndex}: RenderSeedProps) => {
              const Wrapper = roundIndex === 2 ? SingleLineSeed : Seed;

              const nextMatch = _.find(seed.matches, (m: any) => m.block) || {};
              let label: any = '';

              if (!_.isEmpty(seed.fighter1)) {
                label = (
                  <Text textAlign="center" fontSize={10}>
                    {`${seed.fighter1.collection} #${_.truncate(seed.fighter1.player.token_id, { length: 7 })}`}
                    <br/>
                    {`${seed.fighter2.collection} #${_.truncate(seed.fighter2.player.token_id, { length: 7 })}`}
                  </Text>
                );
              }

              return (
                <Wrapper mobileBreakpoint={breakpoint}>
                  <VStack>
                    <Text opacity={0.5} fontSize={12} color={"white"}>
                      {seed.rank1 ? `${seed.rank1} vs ${seed.rank2}` : '-'}
                    </Text>
                    <Tooltip label={label}>
                      <HStack
                        padding={2}
                        borderWidth={2}
                        borderColor={LineColor}
                        borderRadius={100}
                        onClick={() => {nextMatch.block && navigate(`/season/0/tournament/${seed.bracket}/${seed.id}`)}}
                        _hover={{
                          cursor: nextMatch.block ? 'pointer' : 'default',
                          borderColor: nextMatch.block ? winnerColor : LineColor,
                        }}
                      >
                        <Box
                          borderRadius="40px"
                        >
                          <Image
                            boxSize="40px"
                            borderRadius="40px"
                            src={_.isEmpty(seed.fighter1) ? logoSmall : seed.fighter1.player.image_thumbnail_url}
                          />
                        </Box>
                        <Box padding={2}>
                          <Text opacity={0.5}>
                            {seed.score1} - {seed.score2}
                          </Text>
                        </Box>
                        <Box
                          borderRadius="40px"
                        >
                          <Image
                            boxSize="40px"
                            borderRadius="40px"
                            src={_.isEmpty(seed.fighter2) ? logoSmall : seed.fighter2.player.image_thumbnail_url}
                          />
                        </Box>
                      </HStack>
                    </Tooltip>
                    <Text opacity={0.5} fontSize={12} color={seed.log ? "white" : "red.500"}>
                      {nextMatch.block ? `block ${nextMatch.block}` : '-'}
                    </Text>
                  </VStack>
                </Wrapper>
              );
            }}
            swipeableProps={{
              index: slide,
              onChangeIndex: (index: any, indexLatest: any) => {
                setSlide(index);
              }
            }}
          />
        </Box>
      </Center>
    </Container>
  );
};
