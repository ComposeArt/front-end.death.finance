import React, { useEffect, useContext, useState } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Heading,
  Container,
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Box,
  Link,
  Wrap,
  WrapItem,
  Center,
  Image,
  Button,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import { FaCheckCircle, FaDiscord } from "react-icons/fa";

import { PayloadContext } from "./utils/firebase";

export const Rewards = (props: RouteComponentProps) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const [mounted, setMounted]: any = useState(false);

  const { season, user, account } = useContext(PayloadContext);

  useEffect(() => {
    document.title = 'Rewards | NFT Fight Club';
  }, []);

  useEffect(() => {
    if (!mounted && !_.isEmpty(season)) {
      setMounted(true);
    }
  }, [season, mounted]);

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center">
        Season 0 Rewards
      </Heading>
      <Text fontSize={12} color="red.500" marginTop={4}>
        minting starts {moment().to(moment(season.mint_date, 'YYYY-MM-DD'))}
      </Text>
      <Box width="80%">
        <Text textAlign="left" fontSize={12} marginTop={8} marginBottom={4}>
          By participating in death.finance you will earn Grim PFP NFTs.
          <br/><br/>
          Grim NFTs are special trainers that will be used in the future to upgrade and train your NFT fighters. Each new season we will release new variations for the Grims that can be unlocked and earned.
          <br/><br/>
          Grims are broken down into three tiers (Rare, Epic, Legendary). Each tier Grim is based on participation and final ranking in the season. Grims can be minted following the end of each season after the tournament.
        </Text>
      </Box>
      <HStack marginTop={4} spacing={8}>
        <Center width="100px" padding={4} borderColor={lineColor} borderWidth={1} borderRadius={4}>
          <VStack>
            <Text fontSize={12} textAlign="center">
              Registered
              <br/>
              Fighters
            </Text>
            <Text fontSize={18} fontWeight='900' textAlign="center">
              {user.registered || 0}
            </Text>
          </VStack>
        </Center>
        <Center minWidth="100px" padding={4} borderColor={lineColor} borderWidth={1} borderRadius={4}>
          <VStack>
            <Text fontSize={12} textAlign="center">
              Discord
              <br/>
              Connected
            </Text>
            <Text fontSize={18} fontWeight='900' textAlign="center">
              {_.get(user, 'discord.username', '-')}
            </Text>
            {account && (
              <Button
                leftIcon={<FaDiscord />}
                onClick={() => {season.isDev ? window.location.href = `https://dev.death.finance/api/login` : window.location.href = `https://death.finance/api/login`}}
                isDisabled={false}
                marginTop={8}
              >
                CONNECT
              </Button>
            )}
          </VStack>
        </Center>
        <Center width="100px" padding={4} borderColor={lineColor} borderWidth={1} borderRadius={4}>
          <VStack>
            <Text fontSize={12} textAlign="center">
              Chaos
              <br/>
              Added
            </Text>
            <Text fontSize={18} fontWeight='900' textAlign="center">
              {user.chaos || 0}
            </Text>
          </VStack>
        </Center>
      </HStack>
      {season.isDev && mounted && (
        <>
          <Text
            marginBottom={2}
            marginTop={12}
            fontWeight='900'
          >
            RARE GRIMS
          </Text>
          <Box width="80%">
            <Text textAlign="left" fontSize={12} marginTop={2} marginBottom={4}>
              For every fighter registered, you will be whitelisted to mint a rare grim. If you register 3 fighters, you will be able to mint 3 rare grims.
              <br/>
              <br/>
              Each grim will be one of a kind and will only be enough for registered fighters for that season.
            </Text>
          </Box>
          <VStack marginTop={4}>
            <Wrap justify='center' spacing={8}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-1-0.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-1-2.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-1-3.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
          <Text
            marginBottom={2}
            marginTop={12}
            fontWeight='900'
          >
            EPIC GRIMS
          </Text>
          <Box width="80%">
            <Text textAlign="left" fontSize={12} marginTop={2} marginBottom={4}>
              For every fighter registered that makes it into the top 128 tournament, your rare grim will be upgraded to be able to mint a epic grim instead.
              <br/><br/>
              For every time you add chaos, one of your registered fighters that didn't make the tournament will be upgraded.
              <br/><br/>
              For connecting to discord, one of your registered fighters that didn't make the tournament will be upgraded.
            </Text>
          </Box>
          <VStack marginTop={4}>
            <Wrap justify='center' spacing={8}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-2-1.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-2-2.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-2-3.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
          <Text
            marginBottom={2}
            marginTop={12}
            fontWeight='900'
          >
            LEGENDARY GRIMS
          </Text>
          <Box width="80%">
            <Text textAlign="left" fontSize={12} marginTop={2} marginBottom={4}>
              If one of your fighters places 1st, 2nd, or 3rd, we will airdrop you a legendary grim! You will still be able to mint your rare and epic grims.
            </Text>
          </Box>
          <VStack marginTop={4}>
            <Wrap justify='center' spacing={8}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/1-place-bufficorn.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/2-place-bufficorn.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/3-place-bufficorn.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
        </>
      )}
      {!season.isDev && mounted && (
        <>
          <Text
            marginBottom={2}
            marginTop={12}
            fontWeight='900'
          >
            RARE GRIMS
          </Text>
          <Box width="80%">
            <Text textAlign="left" fontSize={12} marginTop={2} marginBottom={4}>
              For every fighter registered, you will be whitelisted to mint a rare grim. If you register 3 fighters, you will be able to mint 3 rare grims.
              <br/>
              <br/>
              Each grim will be one of a kind and will only be enough for registered fighters for that season.
            </Text>
          </Box>
          <VStack marginTop={4}>
            <Wrap justify='center' spacing={8}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-1-0.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-1-2.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="120px"
                      borderRadius="120px"
                      src={'https://storage.googleapis.com/deathfinance.appspot.com/season_0/tier-1-3.png'}
                      opacity={1}
                    />
                  </Center>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
          <Text
            marginBottom={2}
            marginTop={12}
            fontWeight='900'
          >
            EPIC GRIMS
          </Text>
          <Box width="80%">
            <Text textAlign="left" fontSize={12} marginTop={2} marginBottom={4}>
              For every fighter registered that makes it into the top 128 tournament, your rare grim will be upgraded to be able to mint a epic grim instead.
              <br/><br/>
              For every time you add chaos, one of your registered fighters that didn't make the tournament will be upgraded.
              <br/><br/>
              For connecting to discord, one of your registered fighters that didn't make the tournament will be upgraded.
            </Text>
          </Box>
          <VStack marginTop={4}>
            <Wrap justify='center' spacing={8}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Text fontSize={32}>
                      ?
                    </Text>
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Text fontSize={32}>
                      ?
                    </Text>
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Text fontSize={32}>
                      ?
                    </Text>
                  </Center>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
          <Text
            marginBottom={2}
            marginTop={12}
            fontWeight='900'
          >
            LEGENDARY GRIMS
          </Text>
          <Box width="80%">
            <Text textAlign="left" fontSize={12} marginTop={2} marginBottom={4}>
              If one of your fighters places 1st, 2nd, or 3rd, we will airdrop you a legendary grim! You will still be able to mint your rare and epic grims.
            </Text>
          </Box>
          <VStack marginTop={4}>
            <Wrap justify='center' spacing={8}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Text fontSize={32}>
                      ?
                    </Text>
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Text fontSize={32}>
                      ?
                    </Text>
                  </Center>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="120px"
                    height="120px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Text fontSize={32}>
                      ?
                    </Text>
                  </Center>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
        </>
      )}
    </Container>
  );
};
