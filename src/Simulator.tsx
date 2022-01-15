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
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import { RiSwordFill } from "react-icons/ri"
import { FaRandom } from "react-icons/fa"
import {
  GiPerson,
  GiMountaintop,
  GiMoon,
  GiSun,
  GiTwirlyFlower,
  GiFire,
  GiShadowFollower,
  GiSandsOfTime,
  GiSnowflake1,
  GiWaterDrop,
  GiHeavyLightning,
  GiMightyForce,
  GiWhirlwind,
  GiPunchBlast,
  GiPunch,
  GiShield,
  GiHealthNormal,
} from "react-icons/gi"

import { PayloadContext, getRandomPlayer, getRandomPlayers, getCollectionPlayers } from "./utils/firebase";

let prevCollection1 = '';
let prevCollection2 = '';

const elements: any = {
  0: {
    name: 'non-elemental',
    icon: <GiPerson />,
  },
  1: {
    name: 'earth',
    icon: <GiMountaintop />,
  },
  2: {
    name: 'fire',
    icon: <GiFire />,
  },
  3: {
    name: 'water',
    icon: <GiWaterDrop />,
  },
  4: {
    name: 'light',
    icon: <GiSun />,
  },
  5: {
    name: 'time',
    icon: <GiSandsOfTime />,
  },
  6: {
    name: 'force',
    icon: <GiMightyForce />,
  },
  7: {
    name: 'moon',
    icon: <GiMoon />,
  },
  8: {
    name: 'flower',
    icon: <GiTwirlyFlower />,
  },
  9: {
    name: 'shadow',
    icon: <GiShadowFollower />,
  },
  10: {
    name: 'ice',
    icon: <GiSnowflake1 />,
  },
  11: {
    name: 'thunder',
    icon: <GiHeavyLightning />,
  },
  12: {
    name: 'wind',
    icon: <GiWhirlwind />,
  },
};

export const Simulator = (props: RouteComponentProps) => {
  const toast = useToast();
  const LineColor = useColorModeValue('gray.500', 'white.500');

  const { collections, fighters, account } = useContext(PayloadContext);

  const [fighter1, setFighter1]: any = useState({});
  const [fighter2, setFighter2]: any = useState({});

  const [loading1, setLoading1]: any = useState(false);
  const [loading2, setLoading2]: any = useState(false);

  const [collection1, setCollection1]: any = useState('');
  const [collection2, setCollection2]: any = useState('');

  const [players1, setPlayers1]: any = useState([]);
  const [players2, setPlayers2]: any = useState([]);

  const [player1, setPlayer1]: any = useState('');
  const [player2, setPlayer2]: any = useState('');

  const randomFighter1 = async () => {
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

    setLoading1(false);
  };

  const randomFighter2 = async () => {
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

    setLoading2(false);
  };

  useEffect(() => {
    (async function getInitialData() {
      if (_.isEmpty(fighter1) || _.isEmpty(fighter2)) {
        try {
          setLoading1(true);
          setLoading2(true);
          const randomPlayersData = await getRandomPlayers(collections);

          setFighter1(randomPlayersData.player1);
          setFighter2(randomPlayersData.player2);
          setLoading1(false);
          setLoading2(false);
        } catch (error) {
          console.log(error);
          toast({
            title: `${error}`,
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      }
    })();
  }, [collections, fighters, toast, fighter1, fighter2]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection1 && collection1 !== prevCollection1) {
        try {
          setLoading1(true);
          setPlayer1('');
          const players = await getCollectionPlayers(collection1);

          prevCollection1 = collection1;

          setPlayers1(players);
          setFighter1({
            collection: collection1,
            ..._.sample(players),
          });
          setLoading1(false);
        } catch (error) {
          console.log(error);
          toast({
            title: `${error}`,
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      }
    })();
  }, [collection1, toast]);

  useEffect(() => {
    (async function getInitialData() {
      if (collection2 && collection2 !== prevCollection2) {
        try {
          setLoading2(true);
          setPlayer2('');
          const players = await getCollectionPlayers(collection2);

          prevCollection2 = collection2;

          setPlayers2(players);
          setFighter2({
            collection: collection2,
            ..._.sample(players),
          });
          setLoading2(false);
        } catch (error) {
          console.log(error);
          toast({
            title: `${error}`,
            status: 'error',
            isClosable: true,
            duration: 3000,
          });
        }
      }
    })();
  }, [collection2, toast]);

  console.log(fighter1, fighter2)

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
              isDisabled={!collection1}
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
              isDisabled={!collection2}
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
            <Image
              boxSize={{ base: "100px", md: 150 }}
              borderRadius={{ base: "100px", md: 150 }}
              src={fighter1.image_preview_url}
            />
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
              {fighter1.name || `${fighter1.collection} #${fighter1.token_id}`}
            </Text>
          </Box>
          {!_.isEmpty(fighter1) && (
            <HStack marginTop={8} align="center" spacing={4}>
              <Tooltip borderRadius={100} fontSize={10} label={`s-element | ${elements[fighter1.special_element].name}`}>
                <IconButton
                  size="lg"
                  fontSize={24}
                  color="current"
                  borderRadius={100}
                  icon={elements[fighter1.special_element].icon}
                  aria-label={elements[fighter1.special_element].name}
                  _hover={{
                    cursor: 'default'
                  }}
                />
              </Tooltip>
              <Tooltip borderRadius={100} fontSize={10} label={`element | ${elements[fighter1.element].name}`}>
                <IconButton
                  size="lg"
                  fontSize={24}
                  color="current"
                  borderRadius={100}
                  icon={elements[fighter1.element].icon}
                  aria-label={elements[fighter1.element].name}
                  _hover={{
                    cursor: 'default'
                  }}
                />
              </Tooltip>
            </HStack>
          )}
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
            <Image
              boxSize={{ base: "100px", md: 150 }}
              borderRadius={{ base: "100px", md: 150 }}
              src={fighter2.image_preview_url}
            />
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
              {fighter2.name || `${fighter2.collection} #${fighter2.token_id}`}
            </Text>
          </Box>
          {!_.isEmpty(fighter2) && (
            <HStack marginTop={8} align="center" spacing={4}>
              <Tooltip borderRadius={100} fontSize={10} label={`s-element | ${elements[fighter2.special_element].name}`}>
                <IconButton
                  size="lg"
                  fontSize={24}
                  color="current"
                  borderRadius={100}
                  icon={elements[fighter2.special_element].icon}
                  aria-label={elements[fighter2.special_element].name}
                  _hover={{
                    cursor: 'default'
                  }}
                />
              </Tooltip>
              <Tooltip borderRadius={100} fontSize={10} label={`element | ${elements[fighter2.element].name}`}>
                <IconButton
                  size="lg"
                  fontSize={24}
                  color="current"
                  borderRadius={100}
                  icon={elements[fighter2.element].icon}
                  aria-label={elements[fighter2.element].name}
                  _hover={{
                    cursor: 'default'
                  }}
                />
              </Tooltip>
            </HStack>
          )}
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
    </Container>
  );
};
