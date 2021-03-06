import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import {
  Container,
  Heading,
  Box,
  Text,
  useToast,
  Button,
  HStack,
  Wrap,
  WrapItem,
  VStack,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { FaRandom } from "react-icons/fa";
import { useCollection } from 'react-firebase-hooks/firestore';

import { NavLink } from "./NavLink";
import { FighterPortrait, FighterStats } from './Fighter';
import { PayloadContext, getFighter, fighter1MatchesQuery, fighter2MatchesQuery } from "./utils/firebase";
import { PowerDistribution } from "./PowerDistribution";
import { Matches } from './Matches';

const FighterHeader = (props: any) => {
  const formatAddress = props.fighter.owner ? `${props.fighter.owner.slice(0, 6)}...${props.fighter.owner.slice(props.fighter.owner.length - 4, props.fighter.owner.length)}` : '-';

  return (
    <>
      <Heading
        size='md'
        marginTop={12}
        marginBottom={4}
        textAlign="center"
        lineHeight={1.5}
      >
        {`${props.fighter.collection} #${_.truncate(props.fighter.token_id, { length: 7 })}`}
      </Heading>
      <Box marginBottom={4}>
        <NavLink to={`/profile/${props.fighter.owner}`}>
          {formatAddress} {props.fighter.owner === props.account ? '(you)' : ''}
        </NavLink>
      </Box>
      <FighterPortrait fighter={props.fighter} big />
      <HStack
        w="100%"
        align="center"
        justify="center"
        spacing={8}
        marginTop={4}
      >
        <NavLink to={`/season/0/collections/${props.fighter.collection}`}>collection</NavLink>
        <NavLink state={{ fighter: props.fighter }} to={`/season/0/fighters/${props.fighter.id}`}>stats</NavLink>
        <NavLink state={{ fighter: props.fighter }} to={`/season/0/fighters/${props.fighter.id}/matches`}>matches</NavLink>
      </HStack>
    </>
  );
};

export const SeasonFighter = (props: any) => {
  const toast = useToast();

  const fighterId = props.id;

  const stateFighter = _.get(props, 'location.state.fighter', {});
  const noState = _.isEmpty(stateFighter);

  const [fighter, setFighter]: any = useState({});
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { account, collections, season } = useContext(PayloadContext);

  useEffect(() => {
    (async function getInitialData() {
      try {
        if (fighterId && noState) {
          const result = await getFighter(fighterId);

          if (result) {
            setFighter(result);
          } else {
            navigate('/season/0/fighters');
          }
        }
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
    })();
  }, [fighterId, noState]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load fighter',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  useEffect(() => {
    if (_.isEmpty(stateFighter)) {
      document.title = `${fighter.collection} #${fighter.player ? _.truncate(fighter.player.token_id, { length: 7 }) : '0'}`;
    } else {
      document.title = `${stateFighter.collection} #${_.truncate(stateFighter.token_id, { length: 7 })}`;
    }
  }, [fighter, stateFighter]);

  const formatFighter = {
    ...fighter.player,
    stats: fighter.stats || {},
    owner: fighter.owner,
    timestamp: fighter.timestamp,
    is_invalid: fighter.is_invalid,
    is_doping: fighter.is_doping,
    ranking: fighter.ranking,
    bracket: fighter.bracket,
    next_match: fighter.next_match,
    ...stateFighter,
  };

  const collection = _.find(collections, (c:any) => c.id === formatFighter.collection) || {};

  return (
    <Container maxW='container.md' centerContent>
      <FighterHeader fighter={formatFighter} account={account} />
      <PowerDistribution fighter={formatFighter} collection={collection} season={season} />
      <Wrap marginTop={4} justify='center' spacing={12}>
        <WrapItem>
          <FighterStats fighter={formatFighter} big />
        </WrapItem>
        <WrapItem>
          <VStack spacing={4} align="flex-end">
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Matches:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.matches || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Wins:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.won || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                KOs:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.knockedOutOpponent || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Perfects:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.perfectedOpponent || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                uninjured:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.uninjured || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
              untouched:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.untouched || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                paddy cakes:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.pattyCaked || 0}
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
                {formatFighter.stats.boutsFought || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Dodges:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.dodges || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Criticals:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.criticals || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Counters:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.counterAttacks || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                Misses:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.misses || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                dmg dealt:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.damageDealt || 0}
              </Text>
            </HStack>
            <HStack marginTop={8}>
              <Text fontSize={12} fontWeight={900}>
                dmg received:
              </Text>
              <Text fontSize={12}>
                {formatFighter.stats.damageReceived || 0}
              </Text>
            </HStack>
          </VStack>
        </WrapItem>
      </Wrap>
      <Button
        marginTop={16}
        leftIcon={<FaRandom />}
        onClick={() => {navigate(`/simulator?c1=${formatFighter.collection}&p1=${formatFighter.token_id}`)}}
      >
        simulate
      </Button>
    </Container>
  );
};

export const SeasonFighterMatches = (props: any) => {
  const toast = useToast();

  const fighterId = props.id;
  const stateFighter = _.get(props, 'location.state.fighter', {});

  const [loading, setLoading]: any = useState(true);
  const [fighter, setFighter]: any = useState({});
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { account } = useContext(PayloadContext);

  const [match1Docs, matches1Loading, matches1Error] = useCollection(fighter1MatchesQuery(fighterId));
  const matches1 = match1Docs ? match1Docs?.docs.map((d: any) => d.data()) : [];

  const [match2Docs, matches2Loading, matches2Error] = useCollection(fighter2MatchesQuery(fighterId));
  const matches2 = match2Docs ? match2Docs?.docs.map((d: any) => d.data()) : [];

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        if (fighterId) {
          if (_.isEmpty(stateFighter)) {
            const result = await getFighter(fighterId);

            if (result) {
              setFighter(result);
            } else {
              navigate('/season/0/fighters');
            }
          }
        }
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
      setLoading(false);
    })();
  }, [fighterId, stateFighter]);

  useEffect(() => {
    if (errorLoading || matches1Error || matches2Error) {
      console.log(matches1Error, matches2Error);
      setErrorLoading(false);
      toast({
        title: 'failed to load fighter matches',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, matches1Error, matches2Error, toast]);

  useEffect(() => {
    if (_.isEmpty(stateFighter)) {
      document.title = `Matches | ${fighter.collection} #${fighter.player ? _.truncate(fighter.player.token_id, { length: 7 }) : '0'}`;
    } else {
      document.title = `Matches | ${stateFighter.collection} #${_.truncate(stateFighter.token_id, { length: 7 })}`;
    }
  }, [fighter, stateFighter]);

  const formatFighter = {
    ...fighter.player,
    owner: fighter.owner,
    timestamp: fighter.timestamp,
    ...stateFighter,
  };

  const matches = _.orderBy([...matches1, ...matches2], ["block"], ["desc"]);

  return (
    <Container maxW='container.lg' centerContent>
      <FighterHeader fighter={formatFighter} account={account} />
      <Matches matches={matches} loading={matches1Loading || matches2Loading} />
    </Container>
  )
};
