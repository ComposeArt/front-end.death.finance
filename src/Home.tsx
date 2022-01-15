import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
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
} from "@chakra-ui/react";
import { RouteComponentProps, navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri"

import { LinkButton } from "./LinkButton";
import grim from './images/mgrim-flip.png';
import { PayloadContext, getPlayers, getRandomPlayers } from "./utils/firebase";

export const Home = (props: RouteComponentProps) => {
  const toast = useToast();
  const LineColor = useColorModeValue('gray.500', 'white.500');
  const opacityColor = useColorModeValue('gray.800', 'white');

  const { collections, fighters } = useContext(PayloadContext);
  const [players, setPlayers]: any = useState([]);
  const [randomPlayers, setRandomPlayers]: any = useState({
    player1: {},
    player2: {},
  });

  useEffect(() => {
    (async function getInitialData() {
      try {
        const playersData = await getPlayers(fighters);
        const randomPlayersData = await getRandomPlayers(collections);

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
  }, [collections, fighters, toast]);

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
        <RiSwordFill />
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
        {collections.length} Collections
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
