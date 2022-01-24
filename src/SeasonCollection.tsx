import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { useFuzzy } from 'react-use-fuzzy';
import {
  Container,
  Image,
  Box,
  Text,
  useColorModeValue,
  useToast,
  Wrap,
  WrapItem,
  VStack,
  InputGroup,
  InputLeftAddon,
  Input,
  Spinner,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { FaCheckCircle, FaSearch } from "react-icons/fa";

import { PayloadContext, getCollectionFighters } from "./utils/firebase";
import { NavLink } from "./NavLink";
import { PowerDistribution } from "./PowerDistribution";

export const CollectionHeader = (props: any) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const brightColor = useColorModeValue('gray.800', 'white');

  return (
    <Container maxW='container.md' centerContent>
      <Heading
        size='md'
        marginTop={12}
        marginBottom={4}
        textAlign="center"
        lineHeight={1.5}
      >
        {props.collection.name}
      </Heading>
      <Box
        borderRadius="150px"
        borderColor={lineColor}
        borderWidth={2}
        onClick={() => {navigate(`/season/0/collections/${props.collection.id}`)}}
        _hover={{
          borderColor: brightColor,
          cursor: 'pointer',
        }}
      >
        <Image
          boxSize="150px"
          borderRadius="150px"
          src={props.collection.image_url}
        />
      </Box>
      <Text
        marginTop={4}
        fontSize={{ base: 10, md: 12 }}
        textDecoration="underline"
        opacity={0.5}
        onClick={()=> window.open(props.collection.url, "_blank")}
        _hover={{
          cursor: 'pointer',
          opacity: 1,
        }}
      >
        {props.collection.id}
      </Text>
      <HStack
        w="100%"
        align="center"
        justify="center"
        spacing={8}
        marginTop={8}
      >
        <NavLink to={`/season/0/collections/${props.collection.id}`}>stats</NavLink>
        <NavLink to={`/season/0/collections/${props.collection.id}/fighters`}>fighters</NavLink>
        <NavLink to={`/season/0/collections/${props.collection.id}/matches`}>matches</NavLink>
      </HStack>
    </Container>
  );
};

export const SeasonCollection = (props: any) => {
  const toast = useToast();

  const [loading, setLoading]: any = useState(true);
  const [fighters, setFighters]: any = useState([]);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { collections, season, account } = useContext(PayloadContext);

  const collectionId = props.id;
  const collection = _.find(collections, (c:any) => c.id === collectionId) || {};

  useEffect(() => {
    (async function getInitialData() {
      if (!_.isEmpty(collections) && collection.id) {
        setLoading(true);
        try {
          const allFighters = await getCollectionFighters(collection.id);

          setFighters(allFighters.map((f:any) => {
            return {
              ...f,
              name: `${f.collection} #${_.truncate(f.player.token_id, { length: 7 })}`,
            };
          }));
        } catch (error) {
          console.log(error);
          setErrorLoading(true);
        }
        setLoading(false);
      } else if (!_.isEmpty(collections)) {
        navigate('/season/0/collections');
      }
    })();
  }, [collection, collections]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load fighters',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  useEffect(() => {
    document.title = `${collectionId}`;
  }, [collectionId]);

  return (
    <Container maxW='container.lg' centerContent>
      <CollectionHeader collection={collection} />
      <PowerDistribution collection={collection} season={season} />
      <Text fontSize={12} opacity={0.5}>
        {collection.total || 0} NFTs | {fighters.length} Registered
      </Text>
      <Wrap marginTop={4} justify='center' spacing={12}>
        <WrapItem>
          <VStack spacing={4} align="flex-end">
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Matches:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Wins:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                KOs:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Perfects:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                uninjured:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
              untouched:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                paddy cakes:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
          </VStack>
        </WrapItem>
        <WrapItem>
          <VStack spacing={4} align="flex-end">
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Bouts:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Dodges:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Criticals:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Counters:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Misses:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                dmg dealt:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                dmg received:
              </Text>
              <Text fontSize={12}>
                0
              </Text>
            </HStack>
          </VStack>
        </WrapItem>
      </Wrap>
    </Container>
  );
};

export const SeasonCollectionFighters = (props: any) => {
  const toast = useToast();
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const brightColor = useColorModeValue('gray.800', 'white');
  const chartColor = useColorModeValue('#718096', 'rgba(255, 255, 255, 0.16)');
  const chartSoftColor = useColorModeValue('#A0AEC0', 'rgba(255, 255, 255, 0.08)');

  const [loading, setLoading]: any = useState(true);
  const [fighters, setFighters]: any = useState([]);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { collections, season, account } = useContext(PayloadContext);

  const collectionId = props.id;
  const collection = _.find(collections, (c:any) => c.id === collectionId) || {};

  const { result, keyword, search } = useFuzzy(fighters, {
    keys: ['name', 'collection', 'player.token_id', 'player.name', 'owner', 'player.description'],
  });

  useEffect(() => {
    (async function getInitialData() {
      if (!_.isEmpty(collections) && collection.id) {
        setLoading(true);
        try {
          const allFighters = await getCollectionFighters(collection.id);

          setFighters(allFighters.map((f:any) => {
            return {
              ...f,
              name: `${f.collection} #${_.truncate(f.player.token_id, { length: 7 })}`,
            };
          }));
        } catch (error) {
          console.log(error);
          setErrorLoading(true);
        }
        setLoading(false);
      } else if (!_.isEmpty(collections)) {
        navigate('/season/0/collections');
      }
    })();
  }, [collection, collections]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load fighters',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  useEffect(() => {
    document.title = `Fighters | ${collectionId}`;
  }, [collectionId]);

  return (
    <Container maxW='container.lg' centerContent>
      <CollectionHeader collection={collection} />
      <InputGroup
        size="sm"
        width={{ base: "260px" }}
        marginTop={8}
      >
        <InputLeftAddon
          children={loading ? <Spinner size='sm' /> : <FaSearch />}
          borderRadius={100}
        />
        <Input
          borderRadius={100}
          fontSize={12}
          type='text'
          placeholder='search'
          errorBorderColor='red.500'
          value={keyword}
          onChange={(e) => search(e.target.value)}
        />
      </InputGroup>
      {!fighters.length && !loading && (
        <Text marginTop={8} color="red.500" fontSize={12}>
          no fighters registered in this collection
        </Text>
      )}
      <Wrap marginTop={12} justify='center' spacing={12}>
        {result.map((r: any) => {
          let item = r.item || r;

          return (
            <WrapItem key={item.id} margin={4}>
              <VStack>
                <Box position="relative" marginBottom={4}>
                  <Box
                    borderRadius="150px"
                    borderColor={lineColor}
                    borderWidth={2}
                    onClick={() => {navigate(`/season/0/fighters/${item.id}`)}}
                    _hover={{
                      borderColor: brightColor,
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      boxSize="150px"
                      borderRadius="150px"
                      src={item.player.image_preview_url}
                    />
                  </Box>
                  <Box color={account === item.owner ? 'green.500' : 'current'} position="absolute" right="10px" bottom="0px">
                    <FaCheckCircle fontSize={32} />
                  </Box>
                </Box>
                <Box
                  width="150px"
                  height="32px"
                  textAlign="center"
                >
                  <Text
                    fontSize={{ base: 10, md: 12 }}
                    textDecoration="underline"
                    opacity={0.5}
                    onClick={()=> window.open(item.player.permalink, "_blank")}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 1,
                    }}
                  >
                    {item.name}
                  </Text>
                </Box>
              </VStack>
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
};

export const SeasonCollectionMatches = (props: any) => {
  const toast = useToast();
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const brightColor = useColorModeValue('gray.800', 'white');
  const chartColor = useColorModeValue('#718096', 'rgba(255, 255, 255, 0.16)');
  const chartSoftColor = useColorModeValue('#A0AEC0', 'rgba(255, 255, 255, 0.08)');
  const chartBrightColor = useColorModeValue('#1A202C', 'white');

  const [loading, setLoading]: any = useState(true);
  const [fighters, setFighters]: any = useState([]);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { collections, season, account } = useContext(PayloadContext);

  const collectionId = props.id;
  const collection = _.find(collections, (c:any) => c.id === collectionId) || {};

  useEffect(() => {
    document.title = `Matches | ${collectionId}`;
  }, [collectionId]);

  return (
    <Container maxW='container.lg' centerContent>
      <CollectionHeader collection={collection} />
    </Container>
  );
};
