import React, { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { ethers } from "ethers";
import {
  Heading,
  Container,
  Text,
  VStack,
  Button,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
  useToast,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";

import { NavLink } from "./NavLink";
import { PayloadContext, RemoteChainPayloadContext } from "./utils/firebase";
import { abi } from "./utils/abi";

const simpleContractInterface = new ethers.utils.Interface(abi);
const contractAddress = '0x463146588e0c6E6899A9140D9DB488B2354E3775';
const contract = new Contract(contractAddress, simpleContractInterface);

export const Chaos = (props: RouteComponentProps) => {
  const toast = useToast();

  useEffect(() => {
    document.title = 'Chaos | NFT Fight Club';
  }, []);

  const { account, chain } = useContext(PayloadContext);
  const { blockNumber, randomness } = useContext(RemoteChainPayloadContext);

  const [loading, setLoading]: any = useState(false);
  const [userRandomness, setUserRandomness]: any = useState('');

  const blockBad = _.floor(parseInt(blockNumber, 10) / 10 % 2) !== 0;

  const { state, send } = useContractFunction(contract, "addRandomness", {});

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
      setUserRandomness('');
    }
  }, [state, toast]);

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
        <Text width="320px" textAlign="center" marginTop={8} fontSize={10} color="red.500">
          Can only run on blocks that have an even 2nd digit i.e. (0 - 9, 20 - 29, 40 - 49) etc.
          <br/><br/>
          {`Only positive whole numbers > 2`}
        </Text>
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
          By adding chaos to the fights, you can earn super rare prop drops for the future Grim PFP NFTs.
          <br/><br/>
          <NavLink to='/rewards'>
            More rewards await!
          </NavLink>
        </Text>
      </Box>
    </Container>
  );
};
