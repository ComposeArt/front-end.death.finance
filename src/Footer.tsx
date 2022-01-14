import * as React from "react";
import moment from "moment";
import {
  VStack,
  Image,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { NavLink } from './NavLink';
import composeDark from './images/compose-dark.png';
import composeLight from './images/compose-light.png';

export const Footer = () => {
  const composeLogo = useColorModeValue(composeDark, composeLight);
  const opacityColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      marginTop={24}
      marginBottom={24}
    >
      <VStack
        h="10vh"
        w="100%"
        align="center"
        justify="space-between"
        spacing={4}
      >
        <Image
          boxSize="40px"
          borderRadius="40px"
          src={composeLogo}
          onClick={() => window.open("https://compose.art", "_blank")}
          _hover={{
            cursor: "pointer",
            backgroundColor: opacityColor,
          }}
        />
        <Text fontSize={8}>
          © {moment().format('YYYY')} compose.art
        </Text>
        <Text
          fontSize={10}
          onClick={() => window.open("http://www.alltheprettycolors.com/", "_blank")}
          _hover={{
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Grims by Nathan Walker
        </Text>
        <NavLink to="/faq"> ¿ FAQ ?</NavLink>
      </VStack>
    </Box>
  );
};
