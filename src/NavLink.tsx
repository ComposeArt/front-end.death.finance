import * as React from "react";
import {
  Text,
} from "@chakra-ui/react";
import { Link } from "@reach/router";

export const NavLink = (props: any) => {
  return (
    <Text
      fontSize="sm"
      _hover={{
        textDecoration: "underline"
      }}
    >
      <Link
        {...props}
        getProps={(p) => {
          console.log(p)
          let active = p.isCurrent;

          if (props.partially && p.isPartiallyCurrent) {
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
