import * as React from "react";
import {
  Text,
} from "@chakra-ui/react";
import { Link } from "@reach/router";

export const NavLink = ({ partially, to, children }: any) => {
  return (
    <Text
      fontSize="sm"
      _hover={{
        textDecoration: "underline"
      }}
    >
      <Link
        to={to}
        children={children}
        getProps={(p) => {
          let active = p.isCurrent;

          if (partially && p.isPartiallyCurrent) {
            active = true;
          }

          return {
            style: {
              opacity: active ? 1 : 0.5,
            }
          };
        }}
      />
    </Text>
  );
};
