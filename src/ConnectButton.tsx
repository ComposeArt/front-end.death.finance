import * as React from "react"
import { Button, Box, Text, HStack, Code } from "@chakra-ui/react";
import { useBlockNumber, useEthers, useEtherBalance, ChainId } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

export const ConnectButton = () => {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const blockNumber = useBlockNumber();
  const chain = chainId && ChainId[chainId];

  console.log(blockNumber, chain)

  return account ? (
    <HStack spacing={8}>
      <Text fontSize="sm" fontWeight="bold">
        {chain}
      </Text>
      <Code padding={2} variant="outline" fontSize="sm">
        {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} Ξ
      </Code>
      <Box
        display="flex"
        alignItems="center"
        background="gray.700"
        borderRadius="xl"
        py="0"
      >
        <Button
          onClick={() => {deactivate()}}
          bg="gray.800"
          border="1px solid transparent"
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "blue.400",
            backgroundColor: "gray.700",
          }}
          borderRadius="xl"
          m="1px"
          px={3}
          height="38px"
        >
          <Text color="white" fontSize="md" fontWeight="medium" mr="2">
            {account &&
              `${account.slice(0, 6)}...${account.slice(
                account.length - 4,
                account.length
              )}`}
          </Text>
        </Button>
      </Box>
    </HStack>
  ) : (
    <Button onClick={() => {activateBrowserWallet()}}>
      connect metamask
    </Button>
  );
}
