import * as React from "react";
import { Button } from "@chakra-ui/react";
import { navigate } from "@reach/router";

export const LinkButton = (props: any) => {
  return (
    <Button
      onClick={() => navigate(props.path)}
    >
      {props.text}
    </Button>
  )
};
