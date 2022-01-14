import * as React from "react"
import { IconButton } from "@chakra-ui/react";
import { useBlockNumber, useEthers, useEtherBalance, ChainId } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { FaWallet } from "react-icons/fa"

export const MobileConnectButton = () => {
  const { activateBrowserWallet, deactivate, account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);
  const blockNumber = useBlockNumber();
  const chain = chainId && ChainId[chainId];

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color={account ? "green" : "current"}
      marginLeft="2"
      onClick={() => {account ? deactivate() : activateBrowserWallet()}}
      icon={<FaWallet />}
      aria-label={`Wallet`}
      opacity={account ? 1 : 0.5}
    />
  );
};
