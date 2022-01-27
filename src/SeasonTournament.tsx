import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Bracket,
  RoundProps,
  Seed,
  SeedItem,
  SeedTeam,
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
  keyframes,
  VStack,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri";
import { FaCheckCircle, FaBookDead } from "react-icons/fa";
import logoSmall from './images/logo-small.png';

import { SeasonHeader } from "./SeasonHeader";
import { NavLink } from "./NavLink";
import { ListCollections } from "./ListCollections";
import { PayloadContext, fetchAssets, streamOwnerFighters, remoteRegisterFighter } from "./utils/firebase";

export const SeasonTournament = (props: any) => {
  const [mounted, setMounted]: any = useState(false);
  const [loading, setLoading]: any = useState(true);
  const [owner, setOwner]: any = useState('');
  const [errorLoading, setErrorLoading]: any = useState(false);

  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');
  const seedColor = useColorModeValue('white', '#1A202C');

  const [registering, setRegistering]: any = useState('');

  const address = props.address;

  const { account, collections } = useContext(PayloadContext);

  useEffect(() => {
    document.title = 'Tournament | Season 0 | NFT Fight Club';
  }, []);

  const rounds: RoundProps[] = [
    {
      title: 'Top 64',
      seeds: _.times(32, (t) => {
        return {
          id: t + 1,
          player1: {},
          player2: {},
          score1: 0,
          score2: 0,
        }
      }),
    },
    {
      title: 'Top 32',
      seeds: _.times(16, (t) => {
        return {
          id: t + 1,
          player1: {},
          player2: {},
          score1: 0,
          score2: 0,
        }
      }),
    },
    {
      title: 'Sweet 16',
      seeds: _.times(8, (t) => {
        return {
          id: t + 1,
          player1: {},
          player2: {},
          score1: 0,
          score2: 0,
        }
      }),
    },
    {
      title: 'Elite 8',
      seeds: _.times(4, (t) => {
        return {
          id: t + 1,
          player1: {},
          player2: {},
          score1: 0,
          score2: 0,
        }
      }),
    },
    {
      title: 'Final 4',
      seeds: _.times(2, (t) => {
        return {
          id: t + 1,
          player1: {},
          player2: {},
          score1: 0,
          score2: 0,
        }
      }),
    },
    {
      title: 'Grand Final',
      seeds: _.times(1, (t) => {
        return {
          id: t + 1,
          player1: {},
          player2: {},
          score1: 0,
          score2: 0,
        }
      }),
    },
  ];

  return (
    <Container maxW='container.xl' centerContent overflowX="hidden">
      <SeasonHeader />
      <Box marginTop={12} width="100%" overflowX="scroll">
        <Bracket
          rounds={rounds}
          roundTitleComponent={(title: React.ReactNode, roundIndex: number) => {
            return (
              <Text textAlign="center">
                { title }
              </Text>
            );
          }}
          mobileBreakpoint={640}
          renderSeedComponent={({seed, breakpoint, roundIndex, seedIndex}: RenderSeedProps) => {
            return (
              <Seed mobileBreakpoint={breakpoint}>
                <SeedItem style={{ backgroundColor: 'rgba(0, 0, 0, 0)', boxShadow: 'none' }}>
                  <VStack>
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
                </SeedItem>
              </Seed>
            );
          }}
        />
      </Box>
    </Container>
  );
};
