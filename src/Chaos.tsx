import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import {
  Heading,
  Container,
  Text,
  useColorModeValue,
  VStack,
  Button,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  Progress,
  Wrap,
  WrapItem,
  Center,
  useToast,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";

import { NavLink } from "./NavLink";
import { PayloadContext, RemoteChainPayloadContext } from "./utils/firebase";
import contractAbi from "./utils/fightClub.json";

const simpleContractInterface = new ethers.utils.Interface(contractAbi);
const contractAddress = '0xc16e8A86E3834E04AfFADC3bFDFD3FA502190c1B';
const contract = new Contract(contractAddress, simpleContractInterface);

export const Chaos = (props: RouteComponentProps) => {
  const toast = useToast();
  const lineColor = useColorModeValue('gray.500', 'white.500');

  useEffect(() => {
    document.title = 'Chaos | NFT Fight Club';
  }, []);

  const { account, chain } = useContext(PayloadContext);
  const { blockNumber, randomness } = useContext(RemoteChainPayloadContext);

  const [loading, setLoading]: any = useState(false);
  const [userRandomness, setUserRandomness]: any = useState('');
  const [userCount, setUserCount]: any = useState(1);

  const blockBad = _.floor(parseInt(blockNumber, 10) / 10 % 2) !== 0;

  const { state, send } = useContractFunction(contract, "addRandomness", {});

  console.log(state);

  useEffect(() => {
    if (state.errorMessage) {
      toast({
        title: 'failed to add chaos',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });

      setLoading(false);
    }

    if (state.status === "Success") {
      setLoading(false);
      // TODO update server to update user stats and get how many times.
    }
  }, [state]);

  const addChaos = async () => {
    setLoading(true);
    send(userRandomness);
  };

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='md' marginTop={12} textAlign="center">
        Adding Chaos to Fights
      </Heading>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Current Block
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center" color={blockBad ? 'red' : 'current'}>
        {blockNumber}
      </Text>
      <Text opacity={0.5} marginTop={2} fontSize={12} textAlign="center">
        Current Randomness
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {randomness}
      </Text>
      {(!account || chain !== 'Goerli') && (
        <Text color="red.500" textAlign="center" fontSize={12} marginTop={4} marginBottom={4}>
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
            isInvalid={parseInt(userRandomness, 10) < 2 || _.indexOf(userRandomness, '.') > -1}
            value={userRandomness}
            onChange={(event) => {
              setUserRandomness(event.target.value);
            }}
            isDisabled={loading || blockBad}
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
            addChaos();
          }}
          marginTop={12}
          isDisabled={
            (userRandomness && parseInt(userRandomness, 10) < 0) ||
            (userRandomness && _.indexOf(userRandomness, '.') > -1) ||
            blockBad ||
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
          <br/><br/>
          By adding chaos to the fights, you can and earn super rare prop drops for the future Grim personas!
        </Text>
        <NavLink to='/grims'>Find out how you can get even more rewards!</NavLink>
      </Box>
      <Text width="320px" textAlign="center" marginTop={8} fontSize={10} color="red.500">
        Can only run on blocks that have an even 2 digit i.e. (0 - 9, 20 - 29, 40 - 49) etc.
        <br/><br/>
        {`Only positive whole numbers > 2`}
      </Text>
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
