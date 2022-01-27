import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Heading,
  Container,
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Fade,
  Box,
  Link,
  Progress,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";

export const Grims = (props: RouteComponentProps) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');

  const [user, setUser]: any = useState({});

  useEffect(() => {
    document.title = 'Grims | NFT Fight Club';
  }, []);

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
      <VStack marginTop={12}>
        <Text>
          Fighters Registered
        </Text>
        <Box >
          <Progress
            value={((user.register_count || 0) / 8) * 100}
            colorScheme="green"
            width="300px"
            borderRadius={100}
            marginBottom={8}
            marginTop={4}
          />
        </Box>
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
                x1 Registered
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
                x2 Registered
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
                x3 Registered
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
                x5 Registered
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
                x8 Registered
                <br/>
                ??????
              </Text>
            </VStack>
          </WrapItem>
        </Wrap>
      </VStack>
      <VStack marginTop={12}>
        <Text>
          Chaos Added
        </Text>
        <Box >
          <Progress
            value={((user.chaos_count || 0) / 8) * 100}
            colorScheme="green"
            width="300px"
            borderRadius={100}
            marginBottom={8}
            marginTop={4}
          />
        </Box>
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
                x1 Chaos
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
                x2 Chaos
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
                x3 Chaos
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
                x5 Chaos
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
                x8 Chaos
                <br/>
                ??????
              </Text>
            </VStack>
          </WrapItem>
        </Wrap>
      </VStack>
      <VStack marginTop={12}>
        <Text>
          Tournament Round Achieved
        </Text>
        <Box >
          <Progress
            value={((user.tournament_round || 0) / 8) * 100}
            colorScheme="green"
            width="300px"
            borderRadius={100}
            marginBottom={8}
            marginTop={4}
          />
        </Box>
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
                Top 1024
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
                Top 512
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
                Top 256
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
                Top 4
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
                Top 2
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
                WINNER!
                <br/>
                ??????
              </Text>
            </VStack>
          </WrapItem>
        </Wrap>
      </VStack>
      <Heading size='md' marginTop={12} textAlign="center">
        Special ETHDenver 2020 Drops
      </Heading>
      <Box width="80%">
        <Text textAlign="left" fontSize={12} marginTop={8} marginBottom={4}>
          By participating in the{' '}
          <Link
            fontWeight={900}
            color='teal.500'
            href='https://bufficorn.death.finance'
            isExternal
          >
            ETHDenver Bufficorn Fight Club
          </Link>
          {' '}you earn these unique drops.
        </Text>
      </Box>
      <VStack marginTop={12}>
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
                Registered
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
                WINNER!
                <br/>
                ??????
              </Text>
            </VStack>
          </WrapItem>
        </Wrap>
      </VStack>
    </Container>
  );
};