import * as React from "react";
import {
  HStack,
  Box,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";

import { NavLink } from './NavLink';
import { TwitterButton } from "./TwitterButton";
import { DiscordButton } from "./DiscordButton";
import { ConnectButton } from "./ConnectButton";
import { MobileConnectButton } from "./MobileConnectButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import logo from './images/logo.png';

export const Header = () => {
  const backgroundColor = useColorModeValue('white', 'gray.800');
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const opacityColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="50"
      borderBottomWidth={1}
      borderBottomColor={lineColor}
      backgroundColor={backgroundColor}
    >
      <HStack
        h="10vh"
        w="100%"
        align="center"
        justify="center"
        display={{ base: "none", lg: "flex" }}
      >
        <HStack
          h="10vh"
          w="100%"
          padding={8}
          spacing={8}
          justify="flex-start"
        >
          <Image
            boxSize="40px"
            borderRadius="40px"
            src={logo}
            onClick={() => navigate('/')}
            _hover={{
              cursor: "pointer",
              backgroundColor: opacityColor,
            }}
          />
          <NavLink to="/seasons/0">season_0</NavLink>
          <NavLink to="/registry">registry</NavLink>
          <NavLink to="/simulator">simulator</NavLink>
        </HStack>
        <HStack
          h="10vh"
          padding={8}
          spacing={4}
          display={{ base: "none", lg: "flex" }}
        >
          <ConnectButton />
          <ColorModeSwitcher />
          <TwitterButton />
          <DiscordButton />
        </HStack>
      </HStack>
      <HStack
        h="10vh"
        w="100%"
        align="center"
        justify="center"
        display={{ base: "flex", lg: "none" }}
      >
        <HStack
          h="10vh"
          w="100%"
          padding={4}
          justify="flex-start"
        >
          <Image
            boxSize="40px"
            borderRadius="40px"
            src={logo}
            onClick={() => navigate('/')}
            _hover={{
              cursor: "pointer",
              backgroundColor: opacityColor,
            }}
          />
        </HStack>
        <HStack padding={4}>
          <MobileConnectButton />
          <ColorModeSwitcher />
          <TwitterButton />
          <DiscordButton />
        </HStack>
      </HStack>
    </Box>
  );
};
