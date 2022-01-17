import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import {
  Heading,
  Container,
  HStack,
  Image,
  Box,
  Text,
  useColorModeValue,
  useToast,
  VStack,
  IconButton,
  Select,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  Tooltip,
  Progress,
  Button,
  useDisclosure,
  Fade,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import { RiSwordFill } from "react-icons/ri"
import { FaRandom } from "react-icons/fa";
import {
  GiPunchBlast,
  GiPunch,
  GiShield,
  GiHealthNormal,
} from "react-icons/gi"

import logo from './images/logo.png';

import { PayloadContext, getRandomPlayer, getRandomPlayers, getCollectionPlayers, remoteSimulateFight } from "./utils/firebase";
import { elements, matchReporter } from "./utils/fighting";

let prevCollection1 = '';
let prevCollection2 = '';

function delay(delay: any) {
  return new Promise (function(fulfill) {
    setTimeout(fulfill, delay);
  });
};

export const Simulator = (props: RouteComponentProps) => {
  const toast = useToast();
  const LineColor = useColorModeValue('gray.500', 'white.500');

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

  const [match, setMatch]: any = useState('');

  const [matchBouts, setMatchBouts]: any = useState([]);

  const { isOpen, onToggle } = useDisclosure();

  const randomFighter1 = async () => {
    try {
      setMatch('');
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
      setMatch('');
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
    setMatch('');
    setMatchBouts([]);

    try {
      const result = await remoteSimulateFight({
        fighterOneStats: fighter1.binary_power,
        fighterTwoStats: fighter2.binary_power,
        randomness: userRandomness,
        blocknumber: userBlocknumber,
      });

      setMatch(result);
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
    setMounted(true);
  }, []);

  useEffect(() => {
    (async function getInitialData() {
      if (mounted && collections.length) {
        if (_.isEmpty(fighter1) && _.isEmpty(fighter2)) {
          const result = await getRandomPlayers(collections);
          setMatch('');
          setFighter1(result.player1);
          setFighter2(result.player2);
          setLoading1(false);
          setLoading2(false);
        }
      }
    })();
  }, [mounted, collections, fighter1, fighter2]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection1 && collection1 !== prevCollection1) {
        setLoading1(true);
        setPlayer1('');
        setMatch('');
        const players = await getCollectionPlayers(collection1);

        prevCollection1 = collection1;

        setPlayers1(players);
        setFighter1({
          collection: collection1,
          ..._.sample(players),
        });
        setLoading1(false);
      }
    })();
  }, [collection1]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection2 && collection2 !== prevCollection2) {
        setLoading2(true);
        setPlayer2('');
        setMatch('');
        const players = await getCollectionPlayers(collection2);

        prevCollection2 = collection2;

        setPlayers2(players);
        setFighter2({
          collection: collection2,
          ..._.sample(players),
        });
        setLoading2(false);
      }
    })();
  }, [collection2]);

  useEffect(() => {
    (async function getInitialData() {
      if (match) {
        matchReporter({
          match,
          fighter1,
          fighter2,
        });
      }
    })();
  }, [match, fighter1, fighter2]);

  const fighter1SpecialElement: any = fighter1.special_element || 0;
  const fighter2SpecialElement: any = fighter2.special_element || 0;
  const fighter1Element: any = fighter1.element || 0;
  const fighter2Element: any = fighter2.element || 0;

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
        <VStack spacing={4}>
          <Box
            borderRadius={{ base: "100px", md: 150 }}
            borderColor={LineColor}
            borderWidth={2}
          >
            {fighter1.image_preview_url ? (
              <Image
                boxSize={{ base: "100px", md: 150 }}
                borderRadius={{ base: "100px", md: 150 }}
                src={fighter1.image_preview_url}
              />
            ) : (
              <Image
                boxSize={{ base: "100px", md: 150 }}
                borderRadius={{ base: "100px", md: 150 }}
                src={logo}
              />
            )}
          </Box>
          <Box
            width={{ base: "100px", md: 150 }}
            height="60px"
            textAlign="center"
          >
            <Text
              fontSize={{ base: 10, md: 12 }}
              textDecoration="underline"
              opacity={0.5}
              onClick={()=> window.open(fighter1.permalink, "_blank")}
              _hover={{
                cursor: 'pointer',
                opacity: 1,
              }}
            >
              {`${fighter1.collection} #${fighter1.token_id}`}
            </Text>
          </Box>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`s-element | ${elements[fighter1SpecialElement].name}`}>
              <IconButton
                size="md"
                fontSize={20}
                color="current"
                borderRadius={100}
                icon={elements[fighter1SpecialElement].icon}
                aria-label={elements[fighter1SpecialElement].name}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Tooltip borderRadius={100} fontSize={10} label={`element | ${elements[fighter1Element].name}`}>
              <IconButton
                size="md"
                fontSize={20}
                color="current"
                borderRadius={100}
                icon={elements[fighter1Element].icon}
                aria-label={elements[fighter1Element].name}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`s-attack | ${fighter1.special_attack}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiPunchBlast />}
                aria-label={'Special Attack'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter1.special_attack / 15) * 100}
              colorScheme="blue"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`attack | ${fighter1.attack}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiPunch />}
                aria-label={'Attack'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter1.attack / 15) * 100}
              colorScheme="blue"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`defense | ${fighter1.defense}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiShield />}
                aria-label={'Defense'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter1.defense / 15) * 100}
              colorScheme="blue"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`health | ${fighter1.health}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiHealthNormal />}
                aria-label={'Health'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter1.health / 15) * 100}
              colorScheme="blue"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
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
        <VStack spacing={4}>
          <Box
            borderRadius={{ base: "100px", md: 150 }}
            borderColor={LineColor}
            borderWidth={2}
          >
            {fighter2.image_preview_url ? (
              <Image
                boxSize={{ base: "100px", md: 150 }}
                borderRadius={{ base: "100px", md: 150 }}
                src={fighter2.image_preview_url}
              />
            ) : (
              <Image
                boxSize={{ base: "100px", md: 150 }}
                borderRadius={{ base: "100px", md: 150 }}
                src={logo}
              />
            )}
          </Box>
          <Box
            width={{ base: "100px", md: 150 }}
            height="60px"
            textAlign="center"
          >
            <Text
              fontSize={{ base: 10, md: 12 }}
              textDecoration="underline"
              opacity={0.5}
              onClick={()=> window.open(fighter2.permalink, "_blank")}
              _hover={{
                cursor: 'pointer',
                opacity: 1,
              }}
            >
              {`${fighter2.collection} #${fighter2.token_id}`}
            </Text>
          </Box>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`s-element | ${elements[fighter2SpecialElement].name}`}>
              <IconButton
                size="md"
                fontSize={20}
                color="current"
                borderRadius={100}
                icon={elements[fighter2SpecialElement].icon}
                aria-label={elements[fighter2SpecialElement].name}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Tooltip borderRadius={100} fontSize={10} label={`element | ${elements[fighter2Element].name}`}>
              <IconButton
                size="md"
                fontSize={20}
                color="current"
                borderRadius={100}
                icon={elements[fighter2Element].icon}
                aria-label={elements[fighter2Element].name}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`s-attack | ${fighter2.special_attack}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiPunchBlast />}
                aria-label={'Special Attack'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter2.special_attack / 15) * 100}
              colorScheme="red"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`attack | ${fighter2.attack}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiPunch />}
                aria-label={'Attack'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter2.attack / 15) * 100}
              colorScheme="red"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`defense | ${fighter2.defense}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiShield />}
                aria-label={'Defense'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter2.defense / 15) * 100}
              colorScheme="red"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
          <HStack marginTop={8} align="center" spacing={4}>
            <Tooltip borderRadius={100} fontSize={10} label={`health | ${fighter2.health}`}>
              <IconButton
                size="sm"
                fontSize={18}
                color="current"
                borderRadius={100}
                icon={<GiHealthNormal />}
                aria-label={'Health'}
                _hover={{
                  cursor: 'default'
                }}
              />
            </Tooltip>
            <Progress
              value={(fighter2.health / 15) * 100}
              colorScheme="red"
              width={{ base: "80px", md: 130 }}
              borderRadius={100}
            />
          </HStack>
        </VStack>
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
