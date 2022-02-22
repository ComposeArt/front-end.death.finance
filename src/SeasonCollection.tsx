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
import { FaSearch } from "react-icons/fa";
import { useCollection } from 'react-firebase-hooks/firestore';

import { PayloadContext, getCollectionFighters, collection1MatchesQuery, collection2MatchesQuery } from "./utils/firebase";
import { NavLink } from "./NavLink";
import { PowerDistribution } from "./PowerDistribution";
import { FighterPortrait } from './Fighter';
import { Matches } from './Matches';

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

  const { collections, season } = useContext(PayloadContext);

  const collectionId = props.id;
  const collection = _.find(collections, (c:any) => c.id === collectionId) || {};

  useEffect(() => {
    (async function getInitialData() {
      if (!_.isEmpty(collections) && _.find(collections, (c:any) => c.id === collectionId)) {
        setLoading(true);
        try {
          const allFighters = await getCollectionFighters(collectionId);
          const orderedFighters = allFighters.filter((f: any) => !f.is_invalid).map((f:any) => {
            return {
              ...f,
              name: `${f.collection} #${_.truncate(f.player.token_id, { length: 7 })}`,
            };
          });
          setFighters(orderedFighters);
        } catch (error) {
          console.log(error);
          setErrorLoading(true);
        }
        setLoading(false);
      } else if (!_.isEmpty(collections)) {
        navigate('/season/0/collections');
      }
    })();
  }, [collectionId, collections]);

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

  const stats = collection.stats || {};

  return (
    <Container maxW='container.lg' centerContent>
      <CollectionHeader collection={collection} />
      <PowerDistribution isCollection collection={collection} season={season} />
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
                {stats.matches || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Wins:
              </Text>
              <Text fontSize={12}>
                {stats.won || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                KOs:
              </Text>
              <Text fontSize={12}>
                {stats.knockedOutOpponent || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Perfects:
              </Text>
              <Text fontSize={12}>
                {stats.perfectedOpponent || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                uninjured:
              </Text>
              <Text fontSize={12}>
                {stats.uninjured || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
              untouched:
              </Text>
              <Text fontSize={12}>
                {stats.untouched || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                paddy cakes:
              </Text>
              <Text fontSize={12}>
                {stats.pattyCaked || 0}
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
                {stats.boutsFought || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Dodges:
              </Text>
              <Text fontSize={12}>
                {stats.dodges || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Criticals:
              </Text>
              <Text fontSize={12}>
                {stats.criticals || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Counters:
              </Text>
              <Text fontSize={12}>
                {stats.counterAttacks || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Misses:
              </Text>
              <Text fontSize={12}>
                {stats.misses || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                dmg dealt:
              </Text>
              <Text fontSize={12}>
                {stats.damageDealt || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                dmg received:
              </Text>
              <Text fontSize={12}>
                {stats.damageReceived || 0}
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

  const [loading, setLoading]: any = useState(true);
  const [fighters, setFighters]: any = useState([]);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { collections } = useContext(PayloadContext);

  const collectionId = props.id;
  const collection = _.find(collections, (c:any) => c.id === collectionId) || {};

  const { result, keyword, search } = useFuzzy(fighters, {
    keys: ['name', 'collection', 'player.token_id', 'player.name', 'owner', 'player.description'],
  });

  const sortedFighters = _.orderBy(result, ['ranking'], ['asc']);

  useEffect(() => {
    (async function getInitialData() {
      if (!_.isEmpty(collections) && _.find(collections, (c:any) => c.id === collectionId)) {
        setLoading(true);
        try {
          const allFighters = await getCollectionFighters(collectionId);
          const orderedFighters = allFighters.filter((f: any) => !f.is_invalid).map((f:any) => {
            return {
              ...f,
              name: `${f.collection} #${_.truncate(f.player.token_id, { length: 7 })}`,
            };
          });
          setFighters(orderedFighters);
        } catch (error) {
          console.log(error);
          setErrorLoading(true);
        }
        setLoading(false);
      } else if (!_.isEmpty(collections)) {
        navigate('/season/0/collections');
      }
    })();
  }, [collectionId, collections]);

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
        {sortedFighters.map((r: any) => {
          let item = r.item || r;

          const formatFighter = {
            ...item.player,
            owner: item.owner,
            timestamp: item.timestamp,
            is_invalid: item.is_invalid,
            is_doping: item.is_doping,
            ranking: item.ranking,
            bracket: item.bracket,
            next_match: item.next_match,
          };

          return (
            <WrapItem key={formatFighter.id} margin={4}>
              <FighterPortrait fighter={formatFighter} big />
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
};

export const SeasonCollectionMatches = (props: any) => {
  const toast = useToast();

  const { collections } = useContext(PayloadContext);

  const collectionId = props.id;
  const collection = _.find(collections, (c:any) => c.id === collectionId) || {};

  const [match1Docs, matches1Loading, matches1Error] = useCollection(collection1MatchesQuery(collectionId));
  const matches1 = match1Docs ? match1Docs?.docs.map((d: any) => d.data()) : [];

  const [match2Docs, matches2Loading, matches2Error] = useCollection(collection2MatchesQuery(collectionId));
  const matches2 = match2Docs ? match2Docs?.docs.map((d: any) => d.data()) : [];

  useEffect(() => {
    document.title = `Matches | ${collectionId}`;
  }, [collectionId]);

  useEffect(() => {
    if (matches1Error || matches2Error) {
      console.log(matches1Error, matches2Error);
      toast({
        title: 'failed to load matches',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [matches1Error, matches2Error, toast]);

  const matches = _.orderBy([...matches1, ...matches2], ["block"], ["desc"]);

  return (
    <Container maxW='container.lg' centerContent>
      <CollectionHeader collection={collection} />
      <Matches matches={matches} loading={matches1Loading || matches2Loading} />
    </Container>
  );
};
