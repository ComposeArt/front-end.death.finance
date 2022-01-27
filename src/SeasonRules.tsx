import React, { useEffect } from "react";
import {
  Container,
} from "@chakra-ui/react";

import { SeasonHeader } from "./SeasonHeader";

export const SeasonRules = (props: any) => {
  useEffect(() => {
    document.title = 'Rules | Season 0 | NFT Fight Club';
  }, []);

  return (
    <Container maxW='container.md' centerContent>
      <SeasonHeader />
    </Container>
  );
};
