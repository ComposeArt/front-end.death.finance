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
  Image,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { RouteComponentProps, useLocation } from "@reach/router";
import { RiSwordFill } from "react-icons/ri";
import { GiBoxingGlove } from "react-icons/gi";
import { FaBomb } from "react-icons/fa";

import { Fighter } from './Fighter';
import { getPlayers } from "./utils/firebase";
import { matchReporter } from "./utils/fighting";

function delay(delay: any) {
  return new Promise (function(fulfill) {
    setTimeout(fulfill, delay);
  });
};

const useQuery = (queryParam: any) => {
  const search = new URLSearchParams(useLocation().search);
  return search.get(queryParam);
};

export const Simulation = (props: RouteComponentProps) => {
  const toast = useToast();
  const LineColor = useColorModeValue('gray.500', 'white.500');

  const [fighter1, setFighter1]: any = useState({});
  const [fighter2, setFighter2]: any = useState({});

  const c1 = useQuery('c1');
  const p1 = useQuery('p1');
  const c2 = useQuery('c2');
  const p2 = useQuery('p2');
  const match = useQuery('m');
  const randomness = useQuery('r');
  const blockNumber = useQuery('b');

  const [report, setReport]: any = useState([]);

  useEffect(() => {
    (async function getInitialData() {
      if (c1 && p1 && c2 && p2 && match && randomness && blockNumber) {
        try {
          const players = await getPlayers([
            {
              collection: c1,
              player: p1,
            },
            {
              collection: c2,
              player: p2,
            },
          ]);

          const result = matchReporter({
            match,
            fighter1: players[0],
            fighter2: players[1],
          });

          setReport(result);
          setFighter1(players[0]);
          setFighter2(players[1]);
        } catch (error) {
          toast({
            title: 'failed to load simulation',
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      }
    })();
  }, [c1, p1, c2, p2, match, randomness, blockNumber, toast]);

  let fighter1Winner = false;
  let fighter2Winner = false;

  if (!_.isEmpty(report)) {
    if (report[report.length - 1].winner === '0') {
      fighter1Winner = true;
    } else {
      fighter2Winner = true;
    }
  }

  const name1 = `${fighter1.collection} #${_.truncate(fighter1.token_id, { length: 7 })}`;
  const name2 = `${fighter2.collection} #${_.truncate(fighter2.token_id, { length: 7 })}`;

  console.log(report);

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center" lineHeight={1.5}>
        Simulated Results
      </Heading>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Block {blockNumber}
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Randomness {randomness}
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Winner {fighter1Winner ? name1 : (fighter2Winner ? name2 : '-')}
      </Text>
      <HStack marginTop={12} align="flex-start" spacing={8}>
        <Fighter fighter={fighter1} color="blue" winner={fighter1Winner} />
        <Box
          display='flex'
          height={{ base: "100px", md: 150 }}
          justifyContent="center"
          alignItems="center"
          opacity={0.5}
        >
          <RiSwordFill size={24} />
        </Box>
        <Fighter fighter={fighter2} color="red" winner={fighter2Winner} />
      </HStack>
      <Heading size='md' marginTop={12} textAlign="center" lineHeight={1.5} marginBottom={8}>
        Match Log
      </Heading>
      <VStack width="100%" justify="center" align="center" spacing={4}>
        {report.map((r: any, i: number) => {
          const player = r.turn === '0' ? fighter1 : fighter2;

          console.log(_.split(r.log, '|'));

          if (r.turn === '0') {
            return (
              <HStack
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
                      return i % 2 ? <text style={{ fontWeight: 900 }} key={i}>{w}</text> : <text key={i}>{w}</text>
                    })}
                  </Text>
                </Center>
              </HStack>
            );
          } else {
            return (
              <HStack
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
                      return i % 2 ? <text style={{ fontWeight: 900 }} key={i}>{w}</text> : <text key={i}>{w}</text>
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
    </Container>
  );
};
