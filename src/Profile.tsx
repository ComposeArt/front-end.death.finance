import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
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
  Wrap,
  WrapItem,
  Center,
  keyframes,
  VStack,
  Button,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { FaCheckCircle, FaBookDead } from "react-icons/fa";

import { NavLink } from "./NavLink";
import { ListCollections } from "./ListCollections";
import { PayloadContext, fetchAssets, streamOwnerFighters, remoteRegisterFighter } from "./utils/firebase";

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
    document.title = 'Profile';
  }, []);

  useEffect(() => {
    if (!address && account) {
      navigate(`/profile/${account}`);
    }
  }, [account, address]);

  useEffect(() => {
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
      }, 1000);
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
    .sortBy([(p: any) => _.get(p, 'fighter.timestamp')])
    .value();

  return (
    <Container maxW='container.lg' centerContent>
      <ProfileHeader
        address={address}
        owner={owner}
        loading={loading}
        loadingText="Loading NFTs..."
      />
      <Wrap marginTop={12} justify='center' spacing={12}>
        {orderedPlayers.map((p: any) => {
          return (
            <WrapItem key={p.id} margin={4}>
              <VStack>
                <Box position="relative" marginBottom={4}>
                  <Box
                    borderRadius="150px"
                    borderColor={lineColor}
                    borderWidth={2}
                    onClick={() => {p.fighter && navigate(`/season/0/fighters/${p.id}`)}}
                    _hover={{
                      borderColor: p.fighter ? brightColor : lineColor,
                      cursor: p.fighter ? 'pointer' : 'default',
                    }}
                  >
                    <Image
                      boxSize="150px"
                      borderRadius="150px"
                      src={p.image_preview_url}
                    />
                  </Box>
                  {p.fighter && (
                    <Box color={p.fighter.owner === account ? 'green.500' : 'current'} position="absolute" right="10px" bottom="0px">
                      <FaCheckCircle fontSize={32} />
                    </Box>
                  )}
                </Box>
                <Box
                  width="150px"
                  height="50px"
                  textAlign="center"
                >
                  <Text
                    fontSize={{ base: 10, md: 12 }}
                    textDecoration="underline"
                    opacity={0.5}
                    onClick={()=> window.open(p.permalink, "_blank")}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 1,
                    }}
                  >
                    {`${p.collection.slug} #${_.truncate(p.token_id, { length: 7 })}`}
                  </Text>
                </Box>
                {!p.fighter && isOwner && (
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
  const [mounted, setMounted]: any = useState(false);
  const [loading, setLoading]: any = useState(true);
  const [owner, setOwner]: any = useState('');
  const [errorLoading, setErrorLoading]: any = useState(false);

  const [registering, setRegistering]: any = useState('');

  const address = props.address;

  const { account, collections } = useContext(PayloadContext);

  return (
    <Container maxW='container.md' centerContent>
      <ProfileHeader
        address={address}
        owner={owner}
        loading={loading}
        loadingText="Loading matches..."
      />
    </Container>
  );
};
