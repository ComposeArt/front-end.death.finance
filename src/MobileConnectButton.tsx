import * as React from "react"
import { IconButton } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { FaWallet } from "react-icons/fa"

export const MobileConnectButton = (props: any) => {
  const { activateBrowserWallet, deactivate, account } = useEthers();

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
