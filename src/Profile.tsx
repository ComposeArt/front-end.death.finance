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
import { FaCheckCircle, FaBookDead, FaTimesCircle, FaExclamationCircle, FaCrown } from "react-icons/fa";

import { NavLink } from "./NavLink";
import { ListCollections } from "./ListCollections";
import { PayloadContext, fetchAssets, streamOwnerFighters, remoteRegisterFighter, getOwnerMatches } from "./utils/firebase";
import { Matches } from './Matches';

const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg)}
`;

const ProfileHeader = (props: any) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const backgroundColor = useColorModeValue('white', '#1A202C');
  const spinAnimation = `${spin} infinite 3s linear`;

  const formatAddress = props.address ? `${props.address.slice(0, 6)}...${props.address.slice(props.address.length - 4, props.address.length)}` : '-';

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
      <Heading
        size='sm'
        marginTop={8}
        marginBottom={4}
        textAlign="center"
      >
        {props.owner || props.loadingText}
      </Heading>
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
  const [fighters, setFighters]: any = useState({});
  const [owner, setOwner]: any = useState('');
  const [errorLoading, setErrorLoading]: any = useState(false);

  const [registering, setRegistering]: any = useState('');

  const address = props.address;

  const { account, collections } = useContext(PayloadContext);

  const registerFighter = async (p: any) => {
    try {
      setRegistering(p.id);

      await remoteRegisterFighter({
        owner: address,
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
    if (address) {
      document.title = address;

      const fighterListener = streamOwnerFighters({ address }, (data: any) => {
        setFighters((prevFighters: any) => {
          const newFighters = {
            ...prevFighters,
          };

          newFighters[data.id] = data;

          return newFighters;
        });
      });

      return () => {
        fighterListener();
      };
    } else {
      document.title = 'Profile';
    }
  }, [address]);

  useEffect(() => {
    (async function getInitialData() {
      if (address && !_.isEmpty(collections)) {
        setLoading(true);
        setMounted(false);
        setOwner('');
        setPlayers([]);

        try {
          const assets = await fetchAssets(address);
          const filtered = _.filter(assets, (a: any) => _.find(collections, (c: any) => c.id === a.collection.slug));

          setOwner(_.get(filtered, '[0].owner.user.username', '-'));
          setPlayers(filtered);
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
      const fighter = _.isEmpty(fighters) ? null : fighters[p.id.toString()];
      return {
        fighter,
        ...p,
      };
    })
    .sortBy([(p: any) => _.get(p, 'fighter.seed'), (p: any) => _.get(p, 'fighter.timestamp')])
    .value();

  const transferredFighters = _.reduce(fighters, (result: any, f: any, i: any): any => {
    if (!_.find(orderedPlayers, (p: any) => p.id.toString() === i)) {
      result.push({
        ...f,
        ...f.player,
        is_traded: true,
      });
    };

    return result;
  }, []);

  const combinedPlayers = orderedPlayers.length ? [...orderedPlayers, ...transferredFighters] : [];

  return (
    <Container maxW='container.lg' centerContent>
      <ProfileHeader
        address={address}
        owner={owner}
        loading={loading}
        loadingText="Loading NFTs..."
      />
      <Wrap marginTop={12} justify='center' spacing={12}>
        {combinedPlayers.map((p: any) => {
          const fighter = p.fighter || {};

          return (
            <WrapItem key={p.id} margin={4}>
              <VStack>
                <Box position="relative" marginBottom={4}>
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
                  {p.is_traded && (
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
                      cursor: (!_.isEmpty(fighter)&& !fighter.is_invalid) ? 'pointer' : 'default',
                    }}
                  >
                    <Image
                      boxSize="150px"
                      borderRadius="150px"
                      src={p.image_preview_url}
                      opacity={fighter.is_doping || fighter.is_invalid || p.is_traded ? 0.3 : 1}
                    />
                  </Box>
                  {!_.isEmpty(fighter) && !fighter.is_doping && !fighter.is_invalid && (
                    <Box color={fighter.owner === account ? 'green.500' : 'current'} position="absolute" right="10px" bottom="0px">
                      <FaCheckCircle fontSize={32} />
                    </Box>
                  )}
                  {fighter.is_doping && (
                    <Box color={'red.500'} position="absolute" right="10px" bottom="0px">
                      <FaExclamationCircle fontSize={32} />
                    </Box>
                  )}
                  {fighter.is_invalid && (
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
                    👑 {parseInt(fighter.seed, 10) + 1} ({fighter.bracket})
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
                {_.isEmpty(fighter) && isOwner && (
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

  const { account } = useContext(PayloadContext);

  const address = props.address;

  const [loading, setLoading]: any = useState(true);
  const [matches, setMatches]: any = useState([]);
  const [errorLoading, setErrorLoading]: any = useState(false);

  useEffect(() => {
    (async function getInitialData() {
      if (address) {
        document.title = `Matches | ${address}`;

        setLoading(true);
        try {
          const allMatches = await getOwnerMatches(address);
          const orderedMatches = _.sortBy(allMatches, (m: any) => parseInt(m.block, 10));

          setMatches(orderedMatches);
        } catch (error) {
          console.log(error);
          setErrorLoading(true);
        }
        setLoading(false);
      }
    })();
  }, [address]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load matches',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  return (
    <Container maxW='container.lg' centerContent>
      <ProfileHeader
        address={address}
        owner={account}
        loading={loading}
        loadingText="Loading matches..."
      />
      <Matches matches={matches} loading={loading} />
    </Container>
  );
};
