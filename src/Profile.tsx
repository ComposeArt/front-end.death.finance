import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import Blockies from 'react-blockies';
import {
  Heading,
  Container,
  HStack,
  Image,
  Box,
  Text,
  useColorModeValue,
  useToast,
  Center,
  keyframes,
  Wrap,
  WrapItem,
  VStack,
  Button,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { FaCheckCircle, FaBookDead, FaTimesCircle, FaExclamationCircle, FaDiscord } from "react-icons/fa";
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

import { NavLink } from "./NavLink";
import { ListCollections } from "./ListCollections";
import { PayloadContext, fetchAssets, remoteRegisterFighter, owner1MatchesQuery, owner2MatchesQuery, ownerFightersQuery, userQuery } from "./utils/firebase";
import { Matches } from './Matches';

const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg)}
`;

const ProfileHeader = (props: any) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const backgroundColor = useColorModeValue('white', '#1A202C');
  const spinAnimation = `${spin} infinite 3s linear`;
  const [userDoc, userLoading, userError] = useDocument(userQuery(props.address || 'missing'));
  const user = userDoc?.data() || {};

  const formatAddress = props.address ? `${props.address.slice(0, 6)}...${props.address.slice(props.address.length - 4, props.address.length)}` : '-';
  const username = user.discord ? user.discord.username : (props.owner || props.address);

  return (
    <>
      <Center
        height="120px"
        width="120px"
        borderRadius='50%'
        borderWidth={2}
        borderColor={lineColor}
        marginTop={12}
        animation={props.loading && spinAnimation}
      >
        <Blockies
          seed={props.address || ''}
          size={12}
          scale={9}
          bgColor={backgroundColor}
          spotColor={backgroundColor}
        />
      </Center>
      <HStack
        align="center"
        justify="center"
        marginTop={8}
        marginBottom={4}
      >
        {!props.loading && user.discord && (<FaDiscord />)}
        <Heading
          size='sm'
          textAlign="center"
        >
          {props.loading ? props.loadingText : username}
        </Heading>
      </HStack>
      <HStack
        w="100%"
        align="center"
        justify="center"
        spacing={8}
      >
        <NavLink to={`/profile/${props.address}`}>fighters</NavLink>
        <Text
          fontSize="sm"
          textAlign="center"
          onClick={() => {window.open(`https://opensea.io/${props.address}`, "_blank")}}
          opacity={0.5}
          _hover={{
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {formatAddress}
        </Text>
        <NavLink to={`/profile/${props.address}/matches`}>matches</NavLink>
      </HStack>
      {!props.loading && !props.user.discord && props.account === props.address && (
        <Button
          leftIcon={<FaDiscord />}
          onClick={() => {props.season.isDev ? window.location.href = `https://dev.death.finance/api/login` : window.location.href = `https://death.finance/api/login`}}
          isDisabled={false}
          marginTop={8}
        >
          CONNECT
        </Button>
      )}
    </>
  );
};

export const ProfileFighters = (props: any) => {
  const toast = useToast();

  const lineColor = useColorModeValue('gray.500', 'white.500');
  const brightColor = useColorModeValue('gray.800', 'white');

  const [mounted, setMounted]: any = useState(false);
  const [loading, setLoading]: any = useState(true);
  const [players, setPlayers]: any = useState([]);
  const [owner, setOwner]: any = useState('');
  const [errorLoading, setErrorLoading]: any = useState(false);

  const [registering, setRegistering]: any = useState('');

  const address = props.address ? props.address.toLowerCase() : '';

  const { account, collections, user, season } = useContext(PayloadContext);

  const [fighterDocs, fightersLoading, fightersError] = useCollection(ownerFightersQuery(address));

  const fighters = fighterDocs?.docs.map((d: any) => d.data());

  const registerFighter = async (p: any) => {
    try {
      setRegistering(p.id);

      await remoteRegisterFighter({
        owner: account,
        collection: p.collection.slug,
        contract: p.asset_contract.address,
        token_id: p.token_id,
        player: p.id,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: 'failed to register fighter',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }

    setRegistering('');
  };

  useEffect(() => {
    if (!address && account) {
      navigate(`/profile/${account}`);
    }
  }, [account, address]);

  useEffect(() => {
    (async function getInitialData() {
      if (address && !_.isEmpty(collections)) {
        document.title = `Fighters | ${address}`;

        setLoading(true);
        setMounted(false);
        setOwner('');
        setPlayers([]);

        try {
          const assets = await fetchAssets(address);

          setOwner(_.get(assets, '[0].owner.user.username', address));
          setPlayers(assets);
        } catch (error) {
          console.log(error);
          setErrorLoading(true);
        }

        setMounted(true);
      }
    })();
  }, [address, collections]);

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [mounted]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load nfts',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  const isOwner = address === account;

  if (!address && !account) {
    return (
      <Container maxW='container.md' centerContent>
        <Heading
          size='sm'
          marginTop={12}
          marginBottom={4}
          textAlign="center"
          color="red.500"
        >
          Not Connected!
        </Heading>
        <Text fontSize={12} textAlign="center">
          Connect to metamask and the ethereum network to view your potential fighters!
        </Text>
      </Container>
    )
  }

  const orderedPlayers = _.chain(players)
    .map((p: any) => {
      const fighter = _.find(fighters, (f: any) => f.id === String(p.id)) || {};
      return {
        fighter,
        ...p,
      };
    })
    .sortBy([(p: any) => _.get(p, 'fighter.rank'), (p: any) => _.get(p, 'fighter.timestamp')])
    .value();

  const transferredFighters = _.chain(fighters)
    .filter((f: any) => !_.find(players, (p: any) => String(p.id) === f.id))
    .map((f: any) => {
      return {
        ...f,
        ...f.player,
        is_traded: true,
      };
    })
    .value();

  const combinedPlayers = [...orderedPlayers, ...transferredFighters];

  return (
    <Container maxW='container.lg' centerContent>
      <ProfileHeader
        address={address}
        owner={owner}
        loading={loading}
        user={user}
        account={account}
        season={season}
        loadingText="Loading NFTs..."
      />
      <Wrap marginTop={12} justify='center' spacing={12}>
        {combinedPlayers.map((p: any) => {
          const fighter = p.fighter || {};

          if (!p.image_preview_url) {
            fighter.not_ready = true;
          }

          return (
            <WrapItem key={p.id} margin={4}>
              <VStack>
                <Box position="relative" marginBottom={4}>
                  {fighter.not_ready && (
                    <Text textShadow="2px 2px #fff" fontWeight={900} width="150px" color="red" textAlign="center" position="absolute" top="50px" left="0px">
                      NOT READY
                    </Text>
                  )}
                  {fighter.is_invalid && (
                    <Text textShadow="2px 2px #fff" fontWeight={900} width="150px" color="red" textAlign="center" position="absolute" top="50px" left="0px">
                      REFUSING TO FIGHT
                    </Text>
                  )}
                  {fighter.is_doping && (
                    <Text textShadow="2px 2px #fff" fontWeight={900} width="150px" color="red" textAlign="center" position="absolute" top="50px" left="0px">
                      BANNED FOR DOPING
                    </Text>
                  )}
                  {!loading && p.is_traded && (
                    <Text textShadow="2px 2px #fff" fontWeight={900} width="150px" color="red" textAlign="center" position="absolute" top="50px" left="0px">
                      TRADED
                    </Text>
                  )}
                  <Box
                    borderRadius="150px"
                    borderColor={lineColor}
                    borderWidth={2}
                    onClick={() => {!_.isEmpty(fighter) && !fighter.is_invalid && navigate(`/season/0/fighters/${p.id}`)}}
                    _hover={{
                      borderColor: (!_.isEmpty(fighter) && !fighter.is_invalid) ? brightColor : lineColor,
                      cursor: (!_.isEmpty(fighter) && !fighter.is_invalid) ? 'pointer' : 'default',
                    }}
                  >
                    <Image
                      boxSize="150px"
                      borderRadius="150px"
                      src={p.image_preview_url || p.collection.image_url}
                      opacity={fighter.not_ready || fighter.is_doping || fighter.is_invalid || p.is_traded ? 0.3 : 1}
                    />
                  </Box>
                  {!_.isEmpty(fighter) && !fighter.is_doping && !fighter.is_invalid && !fighter.not_ready && (
                    <Box color={fighter.owner === account ? 'green.500' : 'current'} position="absolute" right="10px" bottom="0px">
                      <FaCheckCircle fontSize={32} />
                    </Box>
                  )}
                  {fighter.is_doping && (
                    <Box color={'red.500'} position="absolute" right="10px" bottom="0px">
                      <FaExclamationCircle fontSize={32} />
                    </Box>
                  )}
                  {(fighter.is_invalid || fighter.not_ready) && (
                    <Box color={'red.500'} position="absolute" right="10px" bottom="0px">
                      <FaTimesCircle fontSize={32} />
                    </Box>
                  )}
                </Box>
                {fighter.bracket && (
                  <Text
                    fontSize={{ base: 10, md: 12 }}
                    opacity={0.5}
                    onClick={() => {navigate(`/season/0/tournament/${fighter.bracket}?match=${fighter.next_match}`)}}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 1,
                      textDecoration: "underline"
                    }}
                  >
                    👑 {parseInt(fighter.rank, 10) + 1} ({fighter.bracket})
                  </Text>
                )}
                <Box
                  width="150px"
                  height="50px"
                  textAlign="center"
                >
                  <Text
                    fontSize={{ base: 10, md: 12 }}
                    textDecoration="underline"
                    opacity={0.5}
                    onClick={() => window.open(p.permalink, "_blank")}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 1,
                    }}
                  >
                    {`${p.collection.slug || p.collection} #${_.truncate(p.token_id, { length: 7 })}`}
                  </Text>
                </Box>
                {_.isEmpty(fighter) && isOwner && !p.is_traded && (
                  <Button
                    isLoading={registering === p.id}
                    loadingText='Register'
                    leftIcon={<FaBookDead />}
                    onClick={() => {registerFighter(p)}}
                    marginTop={12}
                    isDisabled={registering}
                  >
                    Register
                  </Button>
                )}
              </VStack>
            </WrapItem>
          );
        })}
      </Wrap>
      {!loading && _.isEmpty(players) && (
        <>
          <Text
            marginTop={8}
            marginBottom={8}
            fontSize={12}
            textAlign="center"
            color="red.500"
          >
            Currently no NFTs owned are from the 100 collections in season_0.
            <br/>
            You can check out the collections below to find ones you like!
          </Text>
          <ListCollections collections={collections} />
        </>
      )}
    </Container>
  );
};

export const ProfileMatches = (props: any) => {
  const toast = useToast();

  const { account, user, season } = useContext(PayloadContext);

  const address = props.address;

  const [match1Docs, matches1Loading, matches1Error] = useCollection(owner1MatchesQuery(address));
  const matches1 = match1Docs ? match1Docs?.docs.map((d: any) => d.data()) : [];

  const [match2Docs, matches2Loading, matches2Error] = useCollection(owner2MatchesQuery(address));
  const matches2 = match2Docs ? match2Docs?.docs.map((d: any) => d.data()) : [];

  useEffect(() => {
    if (matches2Error || matches1Error) {
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
      <ProfileHeader
        address={address}
        owner={address}
        loading={matches1Loading || matches2Loading}
        account={account}
        user={user}
        season={season}
        loadingText="Loading matches..."
      />
      <Matches matches={matches} loading={matches1Loading || matches2Loading} />
    </Container>
  );
};
