import * as React from "react"
import {
  Container,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";

import grim from './images/mgrim.png';

export const NotFound = (props: RouteComponentProps) => {
  return (
    <Container maxW='container.xl' centerContent>
      <Image
        marginTop={12}
        boxSize="300px"
        borderRadius="300px"
        src={grim}
      />
      <Heading marginTop={-12} size='sm' textAlign="center">
        "Where do you think you're going?"
      </Heading>
      <Text
        marginTop={8}
        fontFamily="Rock Salt"
        fontSize={24}
      >
        404
      </Text>
    </Container>
  );
};
