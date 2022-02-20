import React, { useContext } from "react";
import moment from "moment";
import {
  Heading,
  Container,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { NavLink } from "./NavLink";
import { PayloadContext, RemoteChainPayloadContext } from "./utils/firebase";

export const SeasonHeader = (props: any) => {
  const { season } = useContext(PayloadContext);
  const { blockNumber } = useContext(RemoteChainPayloadContext);

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='lg' marginTop={16} textAlign="center">
        Season 0
      </Heading>
      <Text textAlign="center" marginTop={4}>
        “let's talk about nft fight club”
      </Text>
      <Text fontSize={12} color="red.500" marginTop={4}>
        registration ends {moment().to(moment(season.registration_ends, 'YYYY-MM-DD'))}
      </Text>
      <Text opacity={0.5} marginTop={4} fontSize={12} textAlign="center">
        Block
      </Text>
      <Text marginTop={2} fontSize={12} textAlign="center">
        {blockNumber || '-'}
      </Text>
      <Wrap
        width="100%"
        align="center"
        justify="center"
        spacing={8}
        marginTop={8}
      >
        <WrapItem>
          <NavLink to={`/season/0/rules`}>rules</NavLink>
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
          <NavLink partially to={`/season/0/tournament`}>tournament</NavLink>
        </WrapItem>
      </Wrap>
    </Container>
  );
};
