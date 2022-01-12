import React from "react"
import _ from "lodash"
import { ChakraProvider, theme, Center, Box, Text, HStack, VStack, Image } from "@chakra-ui/react";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { TwitterButton } from "./TwitterButton";
import { DiscordButton } from "./DiscordButton";
import { ConnectButton } from "./ConnectButton";

export const App = () => (
  <ChakraProvider theme={theme}>
    <HStack h="10vh" w="100%" align="center" justify="center">
      <HStack h="10vh" w="100%" padding={8} justify="flex-end">
        <Center h="40px">
          <ConnectButton />
        </Center>
        <Center h="40px">
          <ColorModeSwitcher />
        </Center>
        <Center h="40px">
          <TwitterButton />
        </Center>
        <Center h="40px">
          <DiscordButton />
        </Center>
      </HStack>
    </HStack>
  </ChakraProvider>
)
