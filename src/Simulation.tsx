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

import { FighterPortrait } from './Fighter';
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
  const stateSimulation = _.get(props, 'location.state', {});

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

        if (simulation) {
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
        } else if (simulationId === 'local' && !_.isEmpty(stateSimulation)) {
          const result = matchReporter({
            match: stateSimulation.match,
            fighter1: stateSimulation.fighter1,
            fighter2: stateSimulation.fighter2,
          });

          setReport(result);
          setBlockNumber(stateSimulation.block);
          setRandomness(stateSimulation.randomness);
          setFighter1(stateSimulation.fighter1);
          setFighter2(stateSimulation.fighter2);
        } else {
          navigate('/simulator');
        }
      } catch (error) {
        console.log(error);
        setError(true);
      }
    })();
  }, [simulationId, stateSimulation]);

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
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Randomness
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {randomness}
      </Text>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Block
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {blockNumber}
      </Text>
      <HStack marginTop={16} align="flex-start" spacing={8}>
        <FighterPortrait fighter={fighter1} winner={fighter1Winner} />
        <Box
          display='flex'
          height={{ base: "100px", md: 150 }}
          justifyContent="center"
          alignItems="center"
          opacity={0.5}
        >
          <RiSwordFill size={24} />
        </Box>
        <FighterPortrait fighter={fighter2} winner={fighter2Winner} />
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
