import React from "react";
import moment from "moment";
import {
  Heading,
  Container,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { NavLink } from "./NavLink";

export const SeasonHeader = (props: any) => {
  return (
    <Container maxW='container.md' centerContent>
      <Heading size='lg' marginTop={16} textAlign="center">
        Season 0
      </Heading>
      <Text marginTop={4}>
        “let's talk about nft fight club”
      </Text>
      <Text fontSize={12} color="red.500" marginTop={4}>
        preseason starts {moment().to(moment('2022-02-10', 'YYYY-MM-DD'))}
      </Text>
        <Wrap
          width="100%"
          align="center"
          justify="center"
          spacing={8}
          marginTop={8}
        >
          <WrapItem>
            <NavLink to={`/season/0`}>rules</NavLink>
          </WrapItem>
          <WrapItem>
            <NavLink to={`/season/0/collections`}>collections</NavLink>
          </WrapItem>
          <WrapItem>
            <NavLink to={`/season/0/fighters`}>fighters</NavLink>
          </WrapItem>
          <WrapItem>
            <NavLink to={`/season/0/matches`}>matches</NavLink>
          </WrapItem>
          <WrapItem>
            <NavLink to={`/season/0/tournament`}>tournament</NavLink>
          </WrapItem>
        </Wrap>
    </Container>
  );
};
