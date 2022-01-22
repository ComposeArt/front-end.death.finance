import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Heading,
  Container,
  HStack,
  Image,
  Box,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { RouteComponentProps, navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri"

import { LinkButton } from "./LinkButton";
import { ListCollections } from "./ListCollections";
import grim from './images/mgrim-flip.png';
import fcDark from './images/fight-club-logo-dark.png';
import fcLight from './images/fight-club-logo-light.png';
import { PayloadContext, getRandomPlayer, getLatestFighters } from "./utils/firebase";

export const Home = (props: RouteComponentProps) => {
  const LineColor = useColorModeValue('gray.500', 'white.500');
  const opacityColor = useColorModeValue('gray.800', 'white');
  const logoType = useColorModeValue(fcDark, fcLight);

  const { account, collections } = useContext(PayloadContext);
  const [players, setPlayers]: any = useState([]);
  const [randomPlayers, setRandomPlayers]: any = useState({
    player1: {},
    player2: {},
  });

  useEffect(() => {
    document.title = 'NFT Fight Club';
  }, []);

  useEffect(() => {
    (async function getInitialData() {
      try {
        const randomPlayer1 = await getRandomPlayer(collections);
        const randomPlayer2 = await getRandomPlayer(collections);
        const latestFighters = await getLatestFighters();

        setPlayers(_.orderBy(latestFighters, ['timestamp'], ['desc']));
        setRandomPlayers({
          player1: randomPlayer1,
          player2: randomPlayer2,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [collections]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const randomPlayer1 = await getRandomPlayer(collections);
      const randomPlayer2 = await getRandomPlayer(collections);

      setRandomPlayers({
        player1: randomPlayer1,
        player2: randomPlayer2,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [collections]);

  return (
    <Container maxW='container.md' centerContent>
      <Image
        marginTop={12}
        width="50%"
        opacity={0.8}
        src={logoType}
      />
      <Box
        borderBottomWidth={1}
        borderColor={LineColor}
        paddingTop={8}
        paddingLeft={8}
        paddingRight={8}
        marginTop={8}
      >
        <Text fontWeight={900}>
          Welcome to the NFT Fight Club!
        </Text>
        <Text>
          <br/>
          My name is Monsieur Grim and I run this special fight club. I’m not here to sell you anything. I am here to offer you a competition between NFT personas in order to prove which ones are the best NFTs money can buy.
          <br/><br/>
          You bring your hard earned NFTs and I let them fight each other for pride and reputation.
          <br/><br/>
          Does a Bored Ape beat a Lazy Lion? Can a Cryptopunk put down a Doodle? These will all be known in good time.
          <br/><br/>
          Enjoy the inaugural season of death.finance!
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
            boxSize="200px"
            borderRadius="200px"
            src={grim}
          />
        </HStack>
      </Box>
      <Heading size='lg' marginTop={12} textAlign="center">
        Season 0
      </Heading>
      <Text marginTop={4}>
        “let's talk about nft fight club”
      </Text>
      <Text fontSize={12} color="red.500" marginTop={4}>
        preseason starts {moment().to(moment('2022-02-10', 'YYYY-MM-DD'))}
      </Text>
      <HStack marginTop={8} justify="center" spacing={4}>
        <Box>
          <LinkButton
            text="rules"
            path="/season/0"
          />
        </Box>
        <Box>
          <LinkButton
            text="register nfts"
            path={account ? `/profile/${account}` : `/profile`}
          />
        </Box>
        <Box marginTop={8}>
          <LinkButton
            text="fighters"
            path="/season/0/fighters"
          />
        </Box>
      </HStack>
      <HStack marginTop={12} justify="center" spacing={8}>
        <Box
          borderRadius={{ base: "100px", md: 150 }}
          borderColor={LineColor}
          borderWidth={2}
        >
          <Image
            boxSize={{ base: "100px", md: 150 }}
            borderRadius={{ base: "100px", md: 150 }}
            src={randomPlayers.player1.image_preview_url}
          />
        </Box>
        <RiSwordFill />
        <Box
          borderRadius={{ base: "100px", md: 150 }}
          borderColor={LineColor}
          borderWidth={2}
        >
          <Image
            boxSize={{ base: "100px", md: 150 }}
            borderRadius={{ base: "100px", md: 150 }}
            src={randomPlayers.player2.image_preview_url}
          />
        </Box>
      </HStack>
      <Box marginTop={8}>
        <LinkButton
          text="simulate fights"
          path="/simulator"
        />
      </Box>
      <Heading as='h2' size='sm' marginTop={16} textAlign="center">
        Recently Registered
      </Heading>
      <Wrap marginTop={8} justify='center' spacing={4}>
        {players.map((p: any) => {
          return (
            <WrapItem key={p.id} margin={4}>
              <Box
                borderRadius="80px"
                borderColor={LineColor}
                borderWidth={2}
                onClick={() => navigate(`/season/0/fighters/${p.id}`)}
                _hover={{
                  cursor: "pointer",
                  borderColor: opacityColor,
                }}
              >
                <Image
                  boxSize="80px"
                  borderRadius="80px"
                  src={p.player.image_preview_url}
                />
              </Box>
            </WrapItem>
          );
        })}
      </Wrap>
      <Heading as='h2' size='sm' marginTop={16} textAlign="center">
        {collections.length} Collections
      </Heading>
      <ListCollections collections={collections} />
    </Container>
  );
};
