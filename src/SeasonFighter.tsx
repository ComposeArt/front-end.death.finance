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

import { NavLink } from "./NavLink";
import { FighterPortrait, FighterStats } from './Fighter';
import { PayloadContext, getFighter, getFighterMatches } from "./utils/firebase";
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

  const [fighter, setFighter]: any = useState({});
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { account, collections, season } = useContext(PayloadContext);

  useEffect(() => {
    (async function getInitialData() {
      try {
        if (fighterId && _.isEmpty(stateFighter)) {
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
  }, [fighterId, stateFighter]);

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
    owner: fighter.owner,
    timestamp: fighter.timestamp,
    is_invalid: fighter.is_invalid,
    is_doping: fighter.is_doping,
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
  const [matches, setMatches]: any = useState([]);

  const { account } = useContext(PayloadContext);

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        if (fighterId) {
          if (_.isEmpty(stateFighter)) {
            const result = await getFighter(fighterId);

            if (result) {
              const fighterMatches = await getFighterMatches(fighterId);
              const orderedMatches = _.sortBy(fighterMatches, (m: any) => parseInt(m.block, 10));

              setMatches(orderedMatches);
              setFighter(result);
            } else {
              navigate('/season/0/fighters');
            }
          } else {
            const fighterMatches = await getFighterMatches(fighterId);
            const orderedMatches = _.sortBy(fighterMatches, (m: any) => parseInt(m.block, 10));
            setMatches(orderedMatches);
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

  return (
    <Container maxW='container.lg' centerContent>
      <FighterHeader fighter={formatFighter} account={account} />
      <Matches matches={matches} loading={loading} />
    </Container>
  )
};
