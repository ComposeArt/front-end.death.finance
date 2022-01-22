import * as React from "react";
import {
  HStack,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";

import { NavLink } from './NavLink';

export const Subheader = () => {
  const backgroundColor = useColorModeValue('white', 'gray.800');
  const lineColor = useColorModeValue('gray.500', 'white.500');

  return (
    <Box
      position="sticky"
      top="0"
      borderBottomWidth={1}
      borderBottomColor={lineColor}
      backgroundColor={backgroundColor}
      display={{ base: "flex", lg: "none" }}
    >
      <HStack
        h="10vh"
        w="100%"
        align="center"
        justify="space-between"
        padding={8}
      >
        <NavLink partially to="/season/0">season_0</NavLink>
        <NavLink partially to="/simulator">simulator</NavLink>
        <NavLink partially to="/chaos">chaos</NavLink>
      </HStack>
    </Box>
  );
};
