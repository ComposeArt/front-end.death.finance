import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { useContractCall } from "@usedapp/core";
import _ from "lodash";
import {
  Heading,
  Container,
  HStack,
  Box,
  Text,
  useToast,
  VStack,
  IconButton,
  Select,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  Button,
  useDisclosure,
  Fade,
  Switch,
  Tooltip
} from "@chakra-ui/react";
import { RouteComponentProps, navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";
import { useQueryParam, StringParam } from 'use-query-params';

import { FighterPortrait } from './Fighter';
import {
  PayloadContext,
  RemoteChainPayloadContext,
  getRandomPlayer,
  getCollectionPlayers,
  remoteSimulateFight,
} from "./utils/firebase";
import { abi } from "./utils/abi";

let prevCollection1: any;
let prevCollection2: any;

const contractInterface = new ethers.utils.Interface(abi);
const contractAddress = '0x463146588e0c6E6899A9140D9DB488B2354E3775';

const LocalSimulator = (props: any) => {
  const localSimulation = useContractCall({
    abi: contractInterface,
    address: contractAddress,
    method: 'fight',
    args: [
      true,
      String(props.fighter1.binary_power),
      String(props.fighter2.binary_power),
      props.randomness,
      String(props.blockNumber),
    ],
  });

  useEffect(() => {
    if (localSimulation && localSimulation.length) {
      const eventLog = BigInt((localSimulation[0]).toString().replace('.', '')).toString(2);

      navigate(`/simulator/local`, {
        state: {
          match: eventLog,
          block: props.blockNumber,
          randomness: props.randomness,
          fighter1: props.fighter1,
          fighter2: props.fighter2,
        }
      });
    } else {
      setTimeout(() => {
        props.setSimulating(false);
      }, 10000);
    }
  }, [localSimulation, props]);

  return <></>;
};

export const Simulator = (props: RouteComponentProps) => {
  const toast = useToast();

  const [c1, setC1] = useQueryParam('c1', StringParam);
  const [c2, setC2] = useQueryParam('c2', StringParam);
  const [p1, setP1] = useQueryParam('p1', StringParam);
  const [p2, setP2] = useQueryParam('p2', StringParam);
  const [urlBlock, setUrlBlock]: any = useQueryParam('b', StringParam);
  const [urlRandomness, setUrlRandomness]: any = useQueryParam('r', StringParam);

  const [mounted, setMounted]: any = useState(false);

  const { collections, account, chain } = useContext(PayloadContext);
  const { blockNumber, randomness } = useContext(RemoteChainPayloadContext);

  const [fighter1, setFighter1]: any = useState({});
  const [fighter2, setFighter2]: any = useState({});

  const [loading1, setLoading1]: any = useState(true);
  const [loading2, setLoading2]: any = useState(true);
  const [simulating, setSimulating]: any = useState(false);
  const [simulatingLocal, setSimulatingLocal]: any = useState(false);
  const [useLocal, setUseLocal]: any = useState(false);

  const [collection1, setCollection1]: any = useState('');
  const [collection2, setCollection2]: any = useState('');

  const [players1, setPlayers1]: any = useState([]);
  const [players2, setPlayers2]: any = useState([]);

  const [player1, setPlayer1]: any = useState('');
  const [player2, setPlayer2]: any = useState('');

  const [userRandomness, setUserRandomness]: any = useState('');
  const [userBlocknumber, setUserBlocknumber]: any = useState('');

  const { isOpen, onToggle } = useDisclosure();

  const simulateLocalFight = async () => {
    setSimulating(true);

    toast({
      title: 'simulating contract call',
      status: 'info',
      isClosable: true,
      duration: 3000,
    });

    setSimulatingLocal(true);
  }

  const simulateFight = async () => {
    setSimulating(true);

    try {
      const result: any = await remoteSimulateFight({
        f1: fighter1,
        f2: fighter2,
        randomness: userRandomness,
        blocknumber: userBlocknumber,
      });

      navigate(`/simulator/${result.simulation}`);
    } catch (error) {
      toast({
        title: 'failed to simulate fight',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
      setSimulating(false);
    }
  };

  const randomFighter1 = async () => {
    try {
      setLoading1(true);

      if (collection1) {
        const foundP1 = _.find(players1, (p: any) => p.token_id === player1);
        if (player1 && foundP1) {
          setP1(player1)
          setFighter1(foundP1);
        } else {
          setFighter1(_.sample(players1));
          setPlayer1('');
          setP1(undefined)
        }
      } else {
        const result = await getRandomPlayer(collections);
        setFighter1(result);
      }
    } catch (error) {
      toast({
        title: 'failed to load nft',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }

    setLoading1(false);
  };

  const randomFighter2 = async () => {
    try {
      setLoading2(true);

      if (collection2) {
        const foundP2 = _.find(players2, (p: any) => p.token_id === player2);
        if (player2 && foundP2) {
          setP2(player2)
          setFighter2(foundP2);
        } else {
          setFighter2(_.sample(players2));
          setPlayer2('');
          setP2(undefined)
        }
      } else {
        const result = await getRandomPlayer(collections);
        setFighter2(result);
      }
    } catch (error) {
      toast({
        title: 'failed to load nft',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }

    setLoading2(false);
  };

  useEffect(() => {
    document.title = 'Simulate Fights';
    setMounted(true);
  }, []);

  useEffect(() => {
    if ((urlBlock || urlRandomness) && !isOpen) {
      onToggle();
      setUserBlocknumber(parseInt(urlBlock, 10));

      if (!urlRandomness) {
        setUserRandomness(randomness);
      } else {
        setUserRandomness(urlRandomness);
      }
    }
  }, [urlBlock, urlRandomness, randomness, onToggle, isOpen]);

  useEffect(() => {
    if (c1 && _.indexOf(collections, c1) >= -1) {
      setCollection1(c1);
    }

    if (c2 && _.indexOf(collections, c2) >= -1) {
      setCollection2(c2);
    }
  }, [c1, c2, collections]);

  useEffect(() => {
    (async function getInitialData() {
      if (mounted && collections.length) {
        if (_.isEmpty(fighter1) && _.isEmpty(fighter2)) {
          if (!c1) {
            const randomPlayer1 = await getRandomPlayer(collections);
            setFighter1(randomPlayer1);
            setLoading1(false);
          }

          if (!c2) {
            const randomPlayer2 = await getRandomPlayer(collections);
            setFighter2(randomPlayer2);
            setLoading2(false);
          }
        }
      }
    })();
  }, [mounted, collections, fighter1, fighter2, c1, c2]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection1) {
        setLoading1(true);

        const players = await getCollectionPlayers(collection1);

        setPlayers1(players);
        setFighter1(_.sample(players));
        setLoading1(false);
      }
    })();
  }, [collection1]);

  useEffect(() => {
    (async function getInitialData() {
      if (p1 && !_.isEmpty(players1)) {
        const found = _.find(players1, (p: any) => p.token_id === p1);

        if (found) {
          setPlayer1(p1);
          setFighter1(found);
        } else {
          setP1(undefined)
        }
      }
    })();
  }, [players1, p1, setP1]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection2) {
        setLoading2(true);

        const players = await getCollectionPlayers(collection2);

        setPlayers2(players);
        setFighter2(_.sample(players));
        setLoading2(false);
      }
    })();
  }, [collection2]);

  useEffect(() => {
    (async function getInitialData() {
      if (p2 && !_.isEmpty(players2)) {
        const found = _.find(players2, (p: any) => p.token_id === p2);

        if (found) {
          setPlayer2(p2);
          setFighter2(found);
        } else {
          setP2(undefined)
        }
      }
    })();
  }, [players2, p2, setP2]);

  const runLocally = useLocal && account && chain === 'Goerli';

  const disableFight = (userRandomness && parseInt(userRandomness, 10) < 0) ||
    (userRandomness && _.indexOf(userRandomness, '.') > -1) ||
    (userBlocknumber && parseInt(userBlocknumber, 10) < 9) ||
    (userBlocknumber && _.floor(parseInt(userBlocknumber, 10) / 10 % 2) === 0) ||
    (userBlocknumber && _.indexOf(userBlocknumber, '.') > -1) ||
    (userRandomness && !userBlocknumber) ||
    (!userRandomness && userBlocknumber) ||
    (!userBlocknumber && (_.floor(parseInt(blockNumber, 10) / 10 % 2) === 0)) ||
    loading1 || loading2;

  return (
    <Container maxW='container.md' centerContent>
      {simulating && simulatingLocal && (
        <LocalSimulator
          fighter1={fighter1}
          fighter2={fighter2}
          blockNumber={userBlocknumber || blockNumber}
          randomness={userRandomness || randomness}
          setSimulating={setSimulating}
          setSimulatingLocal={setSimulatingLocal}
        />
      )}
      <Heading size='lg' marginTop={12} textAlign="center" lineHeight={1.5}>
        Let's Dance
      </Heading>
      <Text textAlign="center" fontSize={12} margin={4}>
        simulate fights on ethereum exactly how
        <br/>
        they will happen during preseason and the main tournament
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Current Randomness
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {randomness}
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Current Block
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center" color={_.floor(parseInt(blockNumber, 10) / 10 % 2) === 0 ? 'red' : 'current'}>
        {blockNumber}
      </Text>
      <Text width="320px" textAlign="center" marginTop={2} fontSize={10} color="red.500">
        Can only run on blocks that have an odd 2nd digit i.e. (10 - 19, 30 - 39, 50 - 59) etc.
      </Text>
      {(!account || chain !== 'Goerli') && (
        <Text marginTop={4} textAlign="center" color="red.500" fontSize={12}>
          connect to Goerli Ethereum on metamask to use client side or we can simulate using our oracle
        </Text>
      )}
      <HStack marginTop={8} justify="center" spacing={16}>
        <VStack spacing={4}>
          <Select
            fontSize={12}
            width={{ base: "160px", md: 200 }}
            size="sm"
            placeholder='All Collections'
            value={collection1}
            onChange={(event) => {
              setCollection1(event.target.value);
              setC1(event.target.value || undefined);
              setP1(undefined);
              setPlayer1('');
            }}
            borderRadius={100}
            _hover={{
              cursor: 'pointer'
            }}
            isDisabled={simulating}
          >
            {collections.map((c: any) => {
              return (
                <option key={c.id} value={c.id}>{c.name}</option>
              );
            })}
          </Select>
          <InputGroup
            size="sm"
            width={{ base: "160px", md: 200 }}
          >
            <InputLeftAddon
              children='#'
              borderRadius={100}
            />
            <Input
              borderRadius={100}
              fontSize={12}
              type='number'
              placeholder='token id'
              isInvalid={player1 && !_.find(players1, (p: any) => p.token_id === player1)}
              errorBorderColor='red.500'
              value={player1}
              onChange={(event) => {
                setPlayer1(event.target.value);
              }}
              isDisabled={!collection1 || simulating}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  randomFighter1();
                }
              }}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                fontSize="md"
                variant="ghost"
                color="current"
                borderRadius={100}
                onClick={() => {randomFighter1()}}
                icon={<FaRandom />}
                aria-label={`Random Fighter 1`}
                isLoading={loading1}
                isDisabled={simulating}
              />
            </InputRightElement>
          </InputGroup>
        </VStack>
        <VStack spacing={4}>
          <Select
            fontSize={12}
            width={{ base: "160px", md: 200 }}
            size="sm"
            placeholder='All Collections'
            value={collection2}
            onChange={(event) => {
              setCollection2(event.target.value);
              setC2(event.target.value || undefined);
              setP2(undefined);
              setPlayer2('');
            }}
            borderRadius={100}
            _hover={{
              cursor: 'pointer'
            }}
            isDisabled={simulating}
          >
            {collections.map((c: any) => {
              return (
                <option key={c.id} value={c.id}>{c.name}</option>
              );
            })}
          </Select>
          <InputGroup
            size="sm"
            width={{ base: "160px", md: 200 }}
          >
            <InputLeftAddon
              children='#'
              borderRadius={100}
            />
            <Input
              borderRadius={100}
              fontSize={12}
              type='number'
              placeholder='token id'
              isInvalid={player2 && !_.find(players2, (p: any) => p.token_id === player2)}
              errorBorderColor='red.500'
              value={player2}
              onChange={(event) => {
                setPlayer2(event.target.value);
              }}
              isDisabled={!collection2 || simulating}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  randomFighter2();
                }
              }}
            />
            <InputRightElement>
              <IconButton
                size="sm"
                fontSize="md"
                variant="ghost"
                color="current"
                borderRadius={100}
                onClick={() => {randomFighter2()}}
                icon={<FaRandom />}
                aria-label={`Random Fighter 2`}
                isLoading={loading2}
                isDisabled={simulating}
              />
            </InputRightElement>
          </InputGroup>
        </VStack>
      </HStack>
      <HStack marginTop={12} align="flex-start" spacing={8}>
        <FighterPortrait fighter={fighter1} />
        <Box
          display='flex'
          height={{ base: "100px", md: 150 }}
          justifyContent="center"
          alignItems="center"
          opacity={0.5}
        >
          <RiSwordFill size={24} />
        </Box>
        <FighterPortrait fighter={fighter2} />
      </HStack>
      <Tooltip label={disableFight ? 'Invalid Block' : ''}>
        <HStack marginTop={12} spacing={8} justify="center" align="center">
          <Button
            isLoading={simulating}
            loadingText='Simulating'
            leftIcon={<RiSwordFill />}
            onClick={() => {runLocally ? simulateLocalFight() : simulateFight()}}
            isDisabled={disableFight}
          >
            FIGHT
          </Button>
        </HStack>
      </Tooltip>
      <Text
        variant="link"
        fontSize={12}
        marginTop={8}
        isDisabled={simulating}
      >
        Advanced Inputs
      </Text>
      <VStack display="flex" height="200px" align="center" marginBottom={32}>
        <InputGroup
          size="sm"
          width={{ base: "160px", md: 200 }}
          marginTop={4}
        >
          <InputLeftAddon
            children='#'
            borderRadius={100}
          />
          <Input
            borderRadius={100}
            fontSize={12}
            type='number'
            placeholder='randomness'
            errorBorderColor='red.500'
            isInvalid={parseInt(userRandomness, 10) < 0 || _.indexOf(userRandomness, '.') > -1}
            value={userRandomness}
            onChange={(event) => {
              setUserRandomness(event.target.value);
            }}
            isDisabled={simulating}
          />
        </InputGroup>
        <InputGroup
          size="sm"
          width={{ base: "160px", md: 200 }}
          marginTop={4}
        >
          <InputLeftAddon
            children='#'
            borderRadius={100}
          />
          <Input
            borderRadius={100}
            fontSize={12}
            type='number'
            placeholder='blocknumber'
            errorBorderColor='red.500'
            value={userBlocknumber}
            isInvalid={
              parseInt(userBlocknumber, 10) < 9 ||
              _.floor(parseInt(userBlocknumber, 10) / 10 % 2) === 0 ||
              _.indexOf(userBlocknumber, '.') > -1
            }
            onChange={(event) => {
              setUserBlocknumber(event.target.value);
            }}
            isDisabled={simulating}
          />
        </InputGroup>
        <Text
          fontSize={12}
          opacity={0.5}
          marginTop={4}
          marginBottom={2}
        >
          oracle | local
        </Text>
        <Switch
          size='md'
          isChecked={runLocally}
          onChange={() => {setUseLocal(!useLocal)}}
          colorScheme="teal"
          isDisabled={!account && chain !== 'Goerli'}
        />
        <Text width="320px" textAlign="center" marginTop={8} fontSize={10} color="red.500">
          Use the above inputs to replace the current block number and current randomness in the smart contract.
          <br/><br/>
          Can only run on blocks that have an odd 2 digit i.e. (10 - 19, 30 - 39, 50 - 59) etc.
          <br/><br/>
          Only positive whole numbers for both fields.
        </Text>
      </VStack>
    </Container>
  );
};
