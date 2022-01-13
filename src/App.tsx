import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
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
} from "@chakra-ui/react";
import { Router, RouteComponentProps, Link, navigate } from "@reach/router";
import "@fontsource/fira-mono";
import "@fontsource/rock-salt";

import { getCollections } from "./utils/firebase";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { TwitterButton } from "./TwitterButton";
import { DiscordButton } from "./DiscordButton";
import { ConnectButton } from "./ConnectButton";
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
      getProps={({ isCurrent }) => {
        return {
          style: {
            opacity: isCurrent ? 1 : 0.5,
          }
        };
      }}
    />
  </Text>
);

const Home = (props: RouteComponentProps) => {
  const toast = useToast();
  const LineColor = useColorModeValue('gray.500', 'white.500');

  useEffect(() => {
    (async function getInitialData() {
      try {
        const collections = await getCollections();

        console.log(collections);
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

  return (
    <Container maxW='container.md' centerContent>
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
          My name is Mr. Grim and I run this special fight club. I’m not here to sell you anything, I am here to offer you a special competition between NFT personas in order to prove which ones are the best NFTs money can buy.
          <br/><br/>
          You bring your hard earned NFTs and I let them fight each other for pride and reputation.
          <br/><br/>
          Does a Bored Ape beat a Lazy Lion? Can a Cryptopunk put down a Doodle? These will all be known in good time.
          <br/><br/>
          I welcome you to the inaugural season of death.finance!
          <br/><br/>
        </Text>
        <HStack justify="flex-end">
          <Text
            fontFamily="Rock Salt"
            fontSize={24}
          >
            mr grim
          </Text>
          <Image
            boxSize="80px"
            borderRadius="80px"
            src={grim}
          />
        </HStack>
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
  const LineColor = useColorModeValue('gray.500', 'white.500');

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="50"
      borderBottomWidth={1}
      borderBottomColor={LineColor}
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
                cursor: "pointer"
              }}
            />
          </Center>
          <Center h="40px">
            <NavLink to="/seasons/0">season_0</NavLink>
            <NavLink to="/registry">registry</NavLink>
            <NavLink to="/chaos">chaos</NavLink>
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
