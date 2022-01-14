import * as React from "react";
import {
  Text,
} from "@chakra-ui/react";
import { Link } from "@reach/router";

export const NavLink = (props: any) => {
  return (
    <Text
      fontSize="sm"
      marginLeft="4"
      marginRight="4"
      _hover={{
        textDecoration: "underline"
      }}
    >
      <Link
        {...props}
        getProps={(p) => {
          return {
            style: {
              opacity: p.isPartiallyCurrent ? 1 : 0.5,
            }
          };
        }}
      />
    </Text>
  );
};
