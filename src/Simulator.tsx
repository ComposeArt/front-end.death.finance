import React, { useEffect, useState, useContext } from "react";
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
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import { RiSwordFill } from "react-icons/ri";
import { FaRandom } from "react-icons/fa";

import { Fighter } from './Fighter';
import {
  PayloadContext,
  getRandomPlayer,
  getRandomPlayers,
  getCollectionPlayers,
  remoteSimulateFight,
  useQuery,
} from "./utils/firebase";
let prevCollection1 = '';
let prevCollection2 = '';

export const Simulator = (props: RouteComponentProps) => {
  const toast = useToast();

  const c1 = useQuery('c1');
  const p1 = useQuery('p1');
  const c2 = useQuery('c2');
  const p2 = useQuery('p2');
  const qRandomness = useQuery('r');
  const qBlock = useQuery('b');

  const [mounted, setMounted]: any = useState(false);

  const { collections, account } = useContext(PayloadContext);

  const [fighter1, setFighter1]: any = useState({});
  const [fighter2, setFighter2]: any = useState({});

  const [loading1, setLoading1]: any = useState(true);
  const [loading2, setLoading2]: any = useState(true);
  const [simulating, setSimulating]: any = useState(false);

  const [collection1, setCollection1]: any = useState('');
  const [collection2, setCollection2]: any = useState('');

  const [players1, setPlayers1]: any = useState([]);
  const [players2, setPlayers2]: any = useState([]);

  const [player1, setPlayer1]: any = useState('');
  const [player2, setPlayer2]: any = useState('');

  const [userRandomness, setUserRandomness]: any = useState('');
  const [userBlocknumber, setUserBlocknumber]: any = useState('');

  const { isOpen, onToggle } = useDisclosure();

  const randomFighter1 = async () => {
    try {
      setLoading1(true);

      if (collection1) {
        const foundP1 = _.find(players1, (p: any) => p.token_id === player1);
        if (player1 && foundP1) {
          setFighter1(foundP1);
        } else {
          setFighter1(_.sample(players1));
          setPlayer1('');
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
          setFighter2(foundP2);
        } else {
          setFighter2(_.sample(players2));
          setPlayer2('');
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

  const simulateFight = async () => {
    setSimulating(true);

    try {
      const result: any = await remoteSimulateFight({
        f1: fighter1,
        f2: fighter2,
        randomness: userRandomness,
        blocknumber: userBlocknumber,
      });

      if (props.location) {
        const simulationURL = `${props.location.origin}/simulator/${result.simulation}`;

        window.open(simulationURL, "_blank");
      }
    } catch (error) {
      toast({
        title: 'failed to simulate fight',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }

    setSimulating(false);
  }

  useEffect(() => {
    document.title = 'Simulate Fights';
    setMounted(true);
  }, []);

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
        if (_.isEmpty(fighter1) && _.isEmpty(fighter2) && (!c1 || !c2)) {
          const result = await getRandomPlayers(collections);

          setFighter1(result.player1);
          setFighter2(result.player2);
          setLoading1(false);
          setLoading2(false);
        }
      }
    })();
  }, [mounted, collections, fighter1, fighter2, c1, c2]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection1 && collection1 !== prevCollection1) {
        setLoading1(true);
        setPlayer1('');

        const players = await getCollectionPlayers(collection1);
        const found = _.find(players, (p) => p.id === p1);

        prevCollection1 = collection1;

        if (found) {
          setPlayer1(found.token_id);
        }

        setPlayers1(players);
        setFighter1(found || _.sample(players));
        setLoading1(false);
      }
    })();
  }, [collection1, p1]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection2 && collection2 !== prevCollection2) {
        setLoading2(true);
        setPlayer2('');

        const players = await getCollectionPlayers(collection2);

        prevCollection2 = collection2;

        const found = _.find(players, (p) => p.id === p2);

        if (found) {
          setPlayer2(found.token_id);
        }

        setPlayers2(players);
        setFighter2(found || _.sample(players));
        setLoading2(false);
      }
    })();
  }, [collection2, p2]);

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='lg' marginTop={12} textAlign="center" lineHeight={1.5}>
        Let's Dance
      </Heading>
      <Text textAlign="center" fontSize={12} margin={4}>
        simulate fights on ethereum exactly how
        <br/>
        they will happen during preseason and the main tournament
      </Text>
      {!account && (
        <Text textAlign="center" color="red.500" fontSize={12}>
          connect to metamask to use client side or we can simulate using our oracle
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
            onChange={(event) => setCollection1(event.target.value)}
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
            onChange={(event) => setCollection2(event.target.value)}
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
        <Fighter fighter={fighter1} color="blue" />
        <Box
          display='flex'
          height={{ base: "100px", md: 150 }}
          justifyContent="center"
          alignItems="center"
          opacity={0.5}
        >
          <RiSwordFill size={24} />
        </Box>
        <Fighter fighter={fighter2} color="red" />
      </HStack>
      <Button
        isLoading={simulating}
        loadingText='Simulating'
        leftIcon={<RiSwordFill />}
        onClick={() => {simulateFight()}}
        marginTop={12}
        isDisabled={
          (userRandomness && parseInt(userRandomness, 10) < 0) ||
          (userRandomness && _.indexOf(userRandomness, '.') > -1) ||
          (userBlocknumber && parseInt(userBlocknumber, 10) < 0) ||
          (userBlocknumber && parseInt(userBlocknumber, 10) % 5 === 0) ||
          (userBlocknumber && _.indexOf(userBlocknumber, '.') > -1) ||
          (userRandomness && !userBlocknumber) ||
          (!userRandomness && userBlocknumber)
        }
      >
        FIGHT
      </Button>
      <Button
        onClick={() => {
          if (isOpen) {
            setUserRandomness('');
            setUserBlocknumber('');
          }

          onToggle();
        }}
        variant="link"
        fontSize={12}
        marginTop={8}
        opacity={isOpen ? 1 : 0.5}
        _hover={{
          opacity: 1,
          textDecoration: 'underline',
        }}
        isDisabled={simulating}
      >
          Advanced Inputs
      </Button>
      <Box display="flex" height="200px" align="center">
        <Fade in={isOpen} unmountOnExit={true}>
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
                parseInt(userBlocknumber, 10) < 0 ||
                parseInt(userBlocknumber, 10) % 5 === 0 ||
                _.indexOf(userBlocknumber, '.') > -1
              }
              onChange={(event) => {
                setUserBlocknumber(event.target.value);
              }}
              isDisabled={simulating}
            />
          </InputGroup>
          <Text width="320px" textAlign="center" marginTop={8} fontSize={10} color="red.500">
            Use the below inputs to replace the current block number and current randomness in the smart contract.
            <br/><br/>
            Can run on any blocks other than those divisible by 5 (0, 5, 10, 15, ...).
            <br/><br/>
            Only positive whole numbers for both fields.
          </Text>
        </Fade>
      </Box>
    </Container>
  );
};
