import React, { useContext, useEffect } from "react";
import _ from "lodash";
import { useFuzzy } from 'react-use-fuzzy';
import {
  Container,
  Image,
  Box,
  Text,
  useColorModeValue,
  Wrap,
  WrapItem,
  InputGroup,
  InputLeftAddon,
  Input,
  VStack,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { FaSearch } from "react-icons/fa";

import { SeasonHeader } from "./SeasonHeader";
import { PayloadContext } from "./utils/firebase";

export const SeasonCollections = (props: any) => {
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const brightColor = useColorModeValue('gray.800', 'white');
  const { collections } = useContext(PayloadContext);

  const { result, keyword, search } = useFuzzy(collections, {
    keys: ['name', 'collection', 'player.token_id', 'player.name', 'owner', 'player.description'],
  });

  useEffect(() => {
    document.title = 'Collections | Season 0 | NFT Fight Club';
  }, []);

  return (
    <Container maxW='container.lg' centerContent>
      <SeasonHeader />
      <InputGroup
        size="sm"
        width={{ base: "260px" }}
        marginTop={12}
      >
        <InputLeftAddon
          children={<FaSearch />}
          borderRadius={100}
        />
        <Input
          borderRadius={100}
          fontSize={12}
          type='text'
          placeholder='search'
          errorBorderColor='red.500'
          value={keyword}
          onChange={(e) => search(e.target.value)}
        />
      </InputGroup>
      <Wrap marginTop={12} justify='center' spacing={12}>
        {result.map((r: any) => {
          let item = r.item || r;

          return (
            <WrapItem key={item.id} margin={4}>
              <VStack>
                <Box position="relative" marginBottom={4}>
                  <Box
                    borderRadius="150px"
                    borderColor={lineColor}
                    borderWidth={2}
                    onClick={() => {navigate(`/season/0/collections/${item.id}`)}}
                    _hover={{
                      borderColor: brightColor,
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      boxSize="150px"
                      borderRadius="150px"
                      src={item.image_url}
                    />
                  </Box>
                </Box>
                <Box
                  width="150px"
                  height="32px"
                  textAlign="center"
                >
                  <Text
                    fontSize={{ base: 10, md: 12 }}
                    textDecoration="underline"
                    opacity={0.5}
                    onClick={()=> window.open(item.url, "_blank")}
                    _hover={{
                      cursor: 'pointer',
                      opacity: 1,
                    }}
                  >
                    {item.name}
                  </Text>
                </Box>
              </VStack>
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
};
