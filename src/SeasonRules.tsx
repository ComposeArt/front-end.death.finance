import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import {
  Container,
  Box,
} from "@chakra-ui/react";

import { rules } from './utils/rules';
import { SeasonHeader } from "./SeasonHeader";

export const SeasonRules = (props: any) => {
  useEffect(() => {
    document.title = 'Rules | Season 0 | NFT Fight Club';
  }, []);

  return (
    <Container maxW='container.md' centerContent>
      <SeasonHeader />
      <Box marginTop={12}>
        <ReactMarkdown components={ChakraUIRenderer()} children={rules} />
      </Box>
    </Container>
  );
};
