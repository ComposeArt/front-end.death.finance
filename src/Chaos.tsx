import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import {
  Heading,
  Container,
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Fade,
  Button,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  Progress,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";

import { NavLink } from "./NavLink";
import { PayloadContext, RemoteChainPayloadContext } from "./utils/firebase";

export const Chaos = (props: RouteComponentProps) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');

  useEffect(() => {
    document.title = 'Chaos | NFT Fight Club';
  }, []);

  const { account, chain } = useContext(PayloadContext);
  const { blockNumber, randomness } = useContext(RemoteChainPayloadContext);

  const [loading, setLoading]: any = useState(false);
  const [userRandomness, setUserRandomness]: any = useState('');
  const [userCount, setUserCount]: any = useState(1);

  const block5 = blockNumber % 5;

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center">
        Adding Chaos to Fights
      </Heading>
      <Text textAlign="center" opacity={0.5} fontSize={12} marginTop={4}>
        current randomness: {randomness}
      </Text>
      <Text textAlign="center" opacity={0.5} fontSize={12} marginBottom={4}>
        current block number: {blockNumber}
      </Text>
      {(!account || chain !== 'Goerli') && (
        <Text color="red.500" textAlign="center" fontSize={12} marginBottom={4}>
          connect to the goerli chain to add chaos
        </Text>
      )}
      <VStack marginTop={4} spacing={8}>
        <InputGroup
          size="sm"
          width={{ base: "160px", md: 200 }}
        >
          <InputLeftAddon
            children='#'
            borderRadius={100}
          />
          <Input
            borderRadius={100}
            fontSize={12}
            type='number'
            placeholder='randomness'
            errorBorderColor='red.500'
            isInvalid={parseInt(userRandomness, 10) < 0 || _.indexOf(userRandomness, '.') > -1}
            value={userRandomness}
            onChange={(event) => {
              setUserRandomness(event.target.value);
            }}
            isDisabled={loading}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                // TODO
              }
            }}
          />
        </InputGroup>
        <Button
          isLoading={loading}
          loadingText='Adding Chaos...'
          onClick={() => {
            // TODO
          }}
          marginTop={12}
          isDisabled={
            (userRandomness && parseInt(userRandomness, 10) < 0) ||
            (userRandomness && _.indexOf(userRandomness, '.') > -1) ||
            block5 ||
            !account ||
            chain !== 'Goerli'
          }
        >
          Add Chaos
        </Button>
      </VStack>
      <Box width="80%">
        <Text textAlign="left" fontSize={12} marginTop={8} marginBottom={4}>
          Chaos allows the matches to use unique randomness to prevent parties knowing the outcome of the fight.
          You can only add chaos every 5th block and on days with matches scheduled.
          <br/><br/>
          By adding chaos to the fights, you can and earn super rare prop drops for the future Grim personas!
        </Text>
        <NavLink to='/grims'>Find out how you can get even more rewards!</NavLink>
      </Box>
      <VStack marginTop={12}>
        <Text>
          Chaos Added
        </Text>
        <Box >
          <Progress
            value={(userCount / 8) * 100}
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
    </Container>
  );
};
