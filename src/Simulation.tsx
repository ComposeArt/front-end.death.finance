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
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { RiSwordFill } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";
import { navigate } from "@reach/router";

import { Fighter } from './Fighter';
import { getSimulation } from "./utils/firebase";
import { matchReporter } from "./utils/fighting";

export const Simulation = (props: any) => {
  const toast = useToast();
  const LineColor = useColorModeValue('gray.500', 'white.500');

  const [fighter1, setFighter1]: any = useState({});
  const [fighter2, setFighter2]: any = useState({});
  const [blockNumber, setBlockNumber]: any = useState('');
  const [randomness, setRandomness]: any = useState('');
  const [error, setError]: any = useState(false);

  const simulationId = props.simulation;

  const [report, setReport]: any = useState([]);

  useEffect(() => {
    if (error) {
      setError(false);

      toast({
        title: 'failed to load simulation',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [error, toast]);

  useEffect(() => {
    (async function getInitialData() {
      try {
        const simulation: any = await getSimulation(simulationId);

        const result = matchReporter({
          match: simulation.match,
          fighter1: simulation.fighter1,
          fighter2: simulation.fighter2,
        });

        setReport(result);
        setBlockNumber(simulation.block);
        setRandomness(simulation.randomness);
        setFighter1(simulation.fighter1);
        setFighter2(simulation.fighter2);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    })();
  }, [simulationId]);

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

  useEffect(() => {
    document.title = `${name1} vs ${name2}`;
  }, [name1, name2]);

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
      <Button
        marginTop={8}
        leftIcon={<FaRandom />}
        onClick={() => {navigate(`/simulator?c1=${fighter1.collection}&p1=${fighter1.token_id}&c2=${fighter2.collection}&p2=${fighter2.token_id}`)}}
      >
        simulate more
      </Button>
    </Container>
  );
};
