import React, { useEffect, useContext, useState } from "react";
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
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import { FaCheckCircle } from "react-icons/fa";

import { PayloadContext } from "./utils/firebase";

export const Grims = (props: RouteComponentProps) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const [mounted, setMounted]: any = useState(false);

  const { season, user } = useContext(PayloadContext);

  useEffect(() => {
    document.title = 'Grims | NFT Fight Club';
  }, []);

  useEffect(() => {
    if (!mounted && !_.isEmpty(season)) {
      setMounted(true);
    }
  }, [season, mounted]);

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center">
        Grims Props Drops
      </Heading>
      <Box width="80%">
        <Text textAlign="left" fontSize={12} marginTop={8} marginBottom={4}>
          By participating in death.finance you will earn super rare prop drops for the future Grims NFT Personas!
          <br/><br/>
          Don’t know what a prop drop or a persona is?
          <br/><br/>
          Visit{' '}
          <Link
            fontWeight={900}
            color='teal.500'
            href='https://compose.art'
            isExternal
          >
            compose.art
          </Link>
          {' '}to learn more about composable and customizable NFTs!
        </Text>
      </Box>
      {season.isDev && mounted && (
        <>
          <Text
            marginBottom={2}
            marginTop={8}
          >
            Special ETHDenver 2022 Drops
          </Text>
          <VStack marginTop={4}>
            <Wrap justify='center' spacing={8}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="80px"
                      borderRadius="80px"
                      src={'https://storage.googleapis.com/composeart-f9a7a.appspot.com/demo/grims/mouth/eth-denver-snow-beard-prop.png'}
                      opacity={user.discord ? 1 : 0.5}
                    />
                    {user.discord && (
                      <Box position="absolute" right="0px" bottom="0px">
                        <FaCheckCircle fontSize={18} />
                      </Box>
                    )}
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={user.discord ? 1 : 0.5}>
                    Discord
                    <br/>Linked
                  </Text>
                  <Text fontSize={10} textAlign="center" opacity={0.5}>
                    Frozen Beard
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="80px"
                      borderRadius="80px"
                      src={'https://storage.googleapis.com/composeart-f9a7a.appspot.com/demo/grims/backgrounds/eth-denver-mountains.png'}
                      opacity={user.registered > 0 ? 1 : 0.5}
                    />
                    {user.registered > 0 && (
                      <Box position="absolute" right="0px" bottom="0px">
                        <FaCheckCircle fontSize={18} />
                      </Box>
                    )}
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={user.registered > 0 ? 1 : 0.5}>
                    Register
                    <br/>Fighter
                  </Text>
                  <Text fontSize={10} textAlign="center" opacity={0.5}>
                    Mountains
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                    position="relative"
                  >
                    <Image
                      boxSize="80px"
                      borderRadius="80px"
                      src={'https://storage.googleapis.com/composeart-f9a7a.appspot.com/demo/grims/head/eth-denver-cap-prop.png'}
                      opacity={user.chaos > 0 ? 1 : 0.5}
                    />
                    {user.chaos > 0 && (
                      <Box position="absolute" right="0px" bottom="0px">
                        <FaCheckCircle fontSize={18} />
                      </Box>
                    )}
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={user.chaos > 0 ? 1 : 0.5}>
                    Add Chaos
                    <br/>To Fights
                  </Text>
                  <Text fontSize={10} textAlign="center" opacity={0.5}>
                    Ski Cap
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Image
                      boxSize="80px"
                      borderRadius="80px"
                      src={'https://storage.googleapis.com/composeart-f9a7a.appspot.com/demo/grims/eyes/eth-denver-goggles-prop.png'}
                      opacity={0.5}
                    />
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    Top 128
                    <br/>Tournament
                  </Text>
                  <Text fontSize={10} textAlign="center" opacity={0.5}>
                    Ski Goggles
                  </Text>
                </VStack>
              </WrapItem>
            </Wrap>
            <br/>
            <Wrap justify='center' spacing={8}>
            <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Image
                      boxSize="80px"
                      borderRadius="80px"
                      src={'https://storage.googleapis.com/composeart-f9a7a.appspot.com/demo/grims/head/eth-denver-bronze-horn-prop.png'}
                      opacity={0.5}
                    />
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    3rd Place
                    <br/>Tournament
                  </Text>
                  <Text fontSize={10} textAlign="center" opacity={0.5}>
                    Bronze Horn
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Image
                      boxSize="80px"
                      borderRadius="80px"
                      src={'https://storage.googleapis.com/composeart-f9a7a.appspot.com/demo/grims/head/eth-denver-silver-horn-prop.png'}
                      opacity={0.5}
                    />
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    2nd Place
                    <br/>Tournament
                  </Text>
                  <Text fontSize={10} textAlign="center" opacity={0.5}>
                    Silver Horn
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Image
                      boxSize="80px"
                      borderRadius="80px"
                      src={'https://storage.googleapis.com/composeart-f9a7a.appspot.com/demo/grims/head/eth-denver-winner-horn-prop.png'}
                      opacity={0.5}
                    />
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    1st Place
                    <br/>Tournament
                  </Text>
                  <Text fontSize={10} textAlign="center" opacity={0.5}>
                    Gold Horn
                  </Text>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
        </>
      )}
      {!season.isDev && mounted && (
        <>
          <VStack marginTop={12}>
            <Text
              marginBottom={8}
              marginTop={4}
            >
              Fighters Registered
            </Text>
            <Wrap justify='center' spacing={12}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    1x Registered
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    2x Registered
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    3x Registered
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    5x Registered
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    8x Registered
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
          <VStack marginTop={12}>
            <Text
              marginBottom={8}
              marginTop={4}
            >
              Chaos Added
            </Text>
            <Wrap justify='center' spacing={12}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    1x Chaos
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    2x Chaos
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    3x Chaos
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    5x Chaos
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    8x Chaos
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
          <VStack marginTop={12}>
            <Text
              marginBottom={8}
              marginTop={4}
            >
              Tournament Results Achieved
            </Text>
            <Wrap justify='center' spacing={12}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    Top 128
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    Top 64
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    Top 32
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    Top 16
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    Top 8
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
            </Wrap>
            <Box height={4} />
            <Wrap justify='center' spacing={12}>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    3rd Place
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    2nd Place
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
              <WrapItem margin={4}>
                <VStack>
                  <Center
                    width="80px"
                    height="80px"
                    borderWidth={2}
                    borderRadius={100}
                    borderColor={lineColor}
                    marginBottom={4}
                  >
                    <Text fontSize={32} opacity={0.5}>
                      ?
                    </Text>
                  </Center>
                  <Text fontSize={12} textAlign="center" opacity={0.5}>
                    1st Place!
                    <br/>
                    ??????
                  </Text>
                </VStack>
              </WrapItem>
            </Wrap>
          </VStack>
        </>
      )}
    </Container>
  );
};
