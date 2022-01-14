import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
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
  VStack,
} from "@chakra-ui/react";
import { Router, RouteComponentProps, Link, navigate } from "@reach/router";
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { getCollections, getFighters, getPlayers, getRandomPlayers } from "./utils/firebase";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { TwitterButton } from "./TwitterButton";
import { DiscordButton } from "./DiscordButton";
import { ConnectButton } from "./ConnectButton";
import { MobileConnectButton } from "./MobileConnectButton";
import { LinkButton } from "./LinkButton";
import logo from './images/logo.png';
import grim from './images/mgrim-flip.png';
import grimFlip from './images/mgrim.png';
import composeDark from './images/compose-dark.png';
import composeLight from './images/compose-light.png';

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
    <Container maxW='container.md' centerContent>
      <Heading size='lg' marginTop={12} textAlign="center" lineHeight={1.5}>
        Welcome to the NFT
        <br/>
        Fight Club
      </Heading>
      <Box
        borderWidth={1}
        borderColor={LineColor}
        paddingTop={8}
        paddingLeft={8}
        paddingRight={8}
        marginTop={12}
      >
        <Text>
          My name is Monsieur Grim and I run this special fight club. I’m not here to sell you anything. I am here to offer you a competition between NFT personas in order to prove which ones are the best NFTs money can buy.
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
            padding={-8}
          >
            m grim
          </Text>
          <Image
            padding={-8}
            boxSize="120px"
            borderRadius="120px"
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
      <Heading as='h2' size='sm' marginTop={16} textAlign="center">
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
      <Heading as='h2' size='sm' marginTop={16} textAlign="center">
        Simulate Matches
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
        <Text fontWeight={800}>
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
      <Heading as='h2' size='sm' marginTop={16} textAlign="center">
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
    </Container>
  );
};

const NotFound = (props: RouteComponentProps) => (
  <Container maxW='container.xl' centerContent>
    <Image
      marginTop={12}
      boxSize="300px"
      borderRadius="300px"
      src={grimFlip}
    />
    <Heading marginTop={-12} size='sm' textAlign="center">
      "Where do you think you're going?"
    </Heading>
    <Text
      marginTop={8}
      fontFamily="Rock Salt"
      fontSize={24}
    >
      404
    </Text>
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
      <HStack
        h="10vh"
        w="100%"
        align="center"
        justify="center"
        display={{ base: "none", lg: "flex" }}
      >
        <HStack
          h="10vh"
          w="100%"
          padding={8}
          spacing={8}
          justify="flex-start"
        >
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
          <NavLink to="/seasons/0">season_0</NavLink>
          <NavLink to="/registry">registry</NavLink>
          <NavLink to="/simulator">simulator</NavLink>
        </HStack>
        <HStack
          h="10vh"
          padding={8}
          spacing={4}
          display={{ base: "none", lg: "flex" }}
        >
          <ConnectButton />
          <ColorModeSwitcher />
          <TwitterButton />
          <DiscordButton />
        </HStack>
      </HStack>
      <HStack
        h="10vh"
        w="100%"
        align="center"
        justify="space-between"
        display={{ base: "flex", lg: "none" }}
        padding={8}
      >
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
        <HStack paddingLeft={8}>
          <MobileConnectButton />
          <ColorModeSwitcher />
          <TwitterButton />
          <DiscordButton />
        </HStack>
      </HStack>
    </Box>
  );
};

const Subheader = (props: any) => {
  const backgroundColor = useColorModeValue('white', 'gray.800');
  const lineColor = useColorModeValue('gray.500', 'white.500');

  return (
    <Box
      position="sticky"
      top="0"
      borderBottomWidth={1}
      borderBottomColor={lineColor}
      backgroundColor={backgroundColor}
      display={{ base: "flex", lg: "none" }}
    >
      <HStack
        h="10vh"
        w="100%"
        align="center"
        justify="space-between"
        padding={8}
      >
        <NavLink to="/seasons/0">season_0</NavLink>
        <NavLink to="/registry">registry</NavLink>
        <NavLink to="/simulator">simulator</NavLink>
      </HStack>
    </Box>
  );
};

const Footer = () => {
  const composeLogo = useColorModeValue(composeDark, composeLight);
  const opacityColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      marginTop={24}
      marginBottom={24}
    >
      <VStack
        h="10vh"
        w="100%"
        align="center"
        justify="space-between"
        spacing={4}
      >
        <Image
          boxSize="40px"
          borderRadius="40px"
          src={composeLogo}
          onClick={() => window.open("https://compose.art", "_blank")}
          _hover={{
            cursor: "pointer",
            backgroundColor: opacityColor,
          }}
        />
        <Text fontSize={8}>
          © {moment().format('YYYY')} compose.art
        </Text>
        <Text
          fontSize={10}
          onClick={() => window.open("http://www.alltheprettycolors.com/", "_blank")}
          _hover={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Grims by Nathan Walker
        </Text>
        {/* <Text fontSize={10}>
          "i think they can hear us"
        </Text> */}
        <NavLink to="/faq"> ¿ FAQ ?</NavLink>
      </VStack>
    </Box>
  );
};

const Nav = (props: any) => (
  <ChakraProvider theme={theme}>
    <Header />
    <Subheader />
    {props.children}
    <Footer />
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
