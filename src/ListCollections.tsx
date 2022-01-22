import React from "react";
import {
  Wrap,
  WrapItem,
  Text,
} from "@chakra-ui/react";

export const ListCollections = (props: any) => {
  return (
    <Wrap marginTop={4} justify='center'>
      {props.collections.map((c: any) => {
        return (
          <WrapItem key={c.id}>
            <Text
              fontSize={12}
              opacity={0.5}
              textDecoration="underline"
              onClick={()=> window.open(c.url, "_blank")}
              _hover={{
                cursor: "pointer",
                opacity: 1,
              }}
            >
              {c.name}
            </Text>
          </WrapItem>
        );
      })}
    </Wrap>
  );
};
