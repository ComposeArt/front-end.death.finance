import React, { useContext, useEffect, useState } from "react";
import _, { random } from "lodash";
import moment from "moment";
import {
  ChakraProvider,
  extendTheme,
  Center,
  Box,
  Text,
  HStack,
  Image,
  useColorModeValue,
  Container,
  Heading,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Router, RouteComponentProps, Link, navigate } from "@reach/router";
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { getCollections, getFighters, getPlayers, getRandomPlayers } from "./utils/firebase";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { TwitterButton } from "./TwitterButton";
import { DiscordButton } from "./DiscordButton";
import { ConnectButton } from "./ConnectButton";
import { LinkButton } from "./LinkButton";
import logo from './images/logo.png';
import grim from './images/grim.png';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: true,
  fonts: {
    heading: 'Fira Mono',
    body: 'Fira Mono',
  },
});

const NavLink = (props: any) => (
  <Text
    fontSize="sm"
    marginLeft="4"
    marginRight="4"
    _hover={{
      textDecoration: "underline"
    }}
  >
    <Link
      {...props}
      getProps={(p) => {
        return {
          style: {
            opacity: p.isPartiallyCurrent ? 1 : 0.5,
          }
        };
      }}
    />
  </Text>
);

const Home = (props: RouteComponentProps) => {
  const toast = useToast();
  const LineColor = useColorModeValue('gray.500', 'white.500');
  const opacityColor = useColorModeValue('gray.800', 'white');

  const [collections, setCollections]: any = useState([]);
  const [fighters, setFighters]: any = useState([]);
  const [players, setPlayers]: any = useState([]);
  const [randomPlayers, setRandomPlayers]: any = useState({
    player1: {},
    player2: {},
  });

  useEffect(() => {
    (async function getInitialData() {
      try {
        const collectionsData = await getCollections();
        const fightersData = await getFighters();
        const playersData = await getPlayers(fightersData);
        const randomPlayersData = await getRandomPlayers(collectionsData);

        setCollections(collectionsData);
        setFighters(fightersData);
        setPlayers(playersData);
        setRandomPlayers(randomPlayersData);
      } catch (error) {
        console.log(error);
        toast({
          title: `${error}`,
          status: 'error',
          isClosable: true,
          duration: 3000,
        });
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const randomPlayersData = await getRandomPlayers(collections);
      setRandomPlayers(randomPlayersData);
    }, 3000);

    return () => clearInterval(interval);
  }, [collections]);

  return (
    <Container maxW='container.md' centerContent marginBottom={100}>
      <Heading as='h2' size='lg' marginTop={12} textAlign="center">
        Welcome to the NFT Fight Club
      </Heading>
      <Box
        borderWidth={1}
        borderColor={LineColor}
        padding={8}
        marginTop={12}
      >
        <Text>
          My name is Monsieur Grim and I run this special fight club. I’m not here to sell you anything. I am here to offer you a special competition between NFT personas in order to prove which ones are the best NFTs money can buy.
          <br/><br/>
          You bring your hard earned NFTs and I let them fight each other for pride and reputation.
          <br/><br/>
          Does a Bored Ape beat a Lazy Lion? Can a Cryptopunk put down a Doodle? These will all be known in good time.
          <br/><br/>
          I welcome you to the inaugural season of death.finance!
          <br/><br/>
        </Text>
        <Text fontSize={12} color={"green.500"}>
          P.S. secret drops await those who have what it takes to participate
        </Text>
        <HStack justify="flex-end">
          <Text
            fontFamily="Rock Salt"
            fontSize={24}
          >
            m grim
          </Text>
          <Image
            boxSize="80px"
            borderRadius="80px"
            src={grim}
          />
        </HStack>
      </Box>
      <Heading as='h2' size='lg' marginTop={12} textAlign="center">
        Season 0
      </Heading>
      <Text marginTop={4}>
        “let's talk about nft fight club”
      </Text>
      <Text fontSize={12} color="red.500" marginTop={4}>
        preseason starts {moment().to(moment('2022-02-14', 'YYYY-MM-DD'))}
      </Text>
      <HStack marginTop={8} justify="center" spacing={4}>
        <Box>
          <LinkButton
            text="rules"
            path="/seasons/0/rules"
          />
        </Box>
        <Box>
          <LinkButton
            text="register nfts"
            path="/registry"
          />
        </Box>
        <Box marginTop={8}>
          <LinkButton
            text="fighters"
            path="/seasons/0/fighters"
          />
        </Box>
      </HStack>
      <Heading as='h2' size='sm' marginTop={12} textAlign="center">
        Recently Registered
      </Heading>
      <Wrap marginTop={8} justify='center'>
        {players.map((p: any) => {
          return (
            <WrapItem key={p.fighter} margin={4}>
              <Box
                borderRadius="80px"
                borderColor={LineColor}
                borderWidth={2}
                onClick={() => navigate(`/seasons/0/fighters/${p.fighter}`)}
                _hover={{
                  cursor: "pointer",
                  borderColor: opacityColor,
                }}
              >
                <Image
                  boxSize="80px"
                  borderRadius="80px"
                  src={p.image_preview_url}
                />
              </Box>
            </WrapItem>
          );
        })}
      </Wrap>
      <Heading as='h2' size='sm' marginTop={12} textAlign="center">
        100 Collections
      </Heading>
      <Wrap marginTop={4} justify='center'>
        {collections.map((c: any) => {
          return (
            <WrapItem key={c.id}>
              <Text
                fontSize={12}
                opacity={0.5}
                textDecoration="underline"
                onClick={()=> window.open(c.url, "_blank")}
                _hover={{
                  cursor: "pointer",
                  opacity: 1,
                }}
              >
                {c.name}
              </Text>
            </WrapItem>
          );
        })}
      </Wrap>
      <Heading as='h2' size='sm' marginTop={12} textAlign="center">
        Simulate Fights Yourself!
      </Heading>
      <HStack marginTop={8} justify="center" spacing={4}>
        <Box
          borderRadius="80px"
          borderColor={LineColor}
          borderWidth={2}
        >
          <Image
            boxSize="80px"
            borderRadius="80px"
            src={randomPlayers.player1.image_preview_url}
          />
        </Box>
        <Text>
          VS
        </Text>
        <Box
          borderRadius="80px"
          borderColor={LineColor}
          borderWidth={2}
        >
          <Image
            boxSize="80px"
            borderRadius="80px"
            src={randomPlayers.player2.image_preview_url}
          />
        </Box>
      </HStack>
      <Box marginTop={8}>
        <LinkButton
          text="simulate"
          path="/simulator"
        />
      </Box>
    </Container>
  );
};

const NotFound = (props: RouteComponentProps) => (
  <Container maxW='container.xl' centerContent>
    <Heading as='h2' size='sm' marginTop={12} textAlign="center">
      "Where do you think you're going?"
    </Heading>
  </Container>
);

const Header = (props: any) => {
  const backgroundColor = useColorModeValue('white', 'gray.800');
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const opacityColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="50"
      borderBottomWidth={1}
      borderBottomColor={lineColor}
      backgroundColor={backgroundColor}
    >
      <HStack h="10vh" w="100%" align="center" justify="center">
        <HStack h="10vh" w="100%" padding={8} justify="flex-start">
          <Center h="40px">
            <Image
              boxSize="40px"
              borderRadius="40px"
              src={logo}
              onClick={() => navigate('/')}
              _hover={{
                cursor: "pointer",
                backgroundColor: opacityColor,
              }}
            />
          </Center>
          <Center h="40px">
            <NavLink to="/seasons/0">season_0</NavLink>
            <NavLink to="/registry">registry</NavLink>
            <NavLink to="/simulator">simulator</NavLink>
          </Center>
        </HStack>
        <HStack h="10vh" w="100%" padding={8} justify="flex-end">
          <Center h="40px">
            <ConnectButton />
          </Center>
          <Center h="40px">
            <ColorModeSwitcher />
          </Center>
          <Center h="40px">
            <TwitterButton />
          </Center>
          <Center h="40px">
            <DiscordButton />
          </Center>
        </HStack>
      </HStack>
    </Box>
  );
};

const Nav = (props: any) => (
  <ChakraProvider theme={theme}>
    <Header />
    {props.children}
  </ChakraProvider>
);

export const App = () => (
  <Router>
    <Nav path="/">
      <NotFound default />
      <Home path="/" />
    </Nav>
  </Router>
);
