import React, { useEffect } from "react";
import remarkGfm from 'remark-gfm';
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import {
  Container,
  Box,
  VStack,
} from "@chakra-ui/react";

import { rules } from './utils/rules';
import { SeasonHeader } from "./SeasonHeader";

export const SeasonRules = (props: any) => {
  useEffect(() => {
    document.title = 'Rules | Season 0 | NFT Fight Club';
  }, []);

  return (
    <Container maxW='container.md' centerContent padding={4}>
      <SeasonHeader />
      <ReactMarkdown
        components={ChakraUIRenderer()}
        children={rules}
        remarkPlugins={[remarkGfm]}
      />
    </Container>
  );
};
