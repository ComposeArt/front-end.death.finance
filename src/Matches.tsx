import React, { useContext } from "react";
import _ from "lodash";
import {
  Box,
  Text,
  useColorModeValue,
  HStack,
  Wrap,
  WrapItem,
  InputGroup,
  InputLeftAddon,
  Input,
  Spinner,
  VStack,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { FaSearch } from "react-icons/fa";
import { useFuzzy } from 'react-use-fuzzy';

import { RemoteChainPayloadContext } from "./utils/firebase";

export const Matches = (props: any) => {
  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');

  const { blockNumber } = useContext(RemoteChainPayloadContext);

  const { result, keyword, search } = useFuzzy(props.matches, {
    keys: ['collection1', 'collection2', 'player1.token_id', 'player2.token_id'],
  });

  return (
    <>
      <InputGroup
        size="sm"
        width={{ base: "260px" }}
        marginTop={8}
      >
        <InputLeftAddon
          children={props.loading ? <Spinner size='sm' /> : <FaSearch />}
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
      {!props.matches.length && (
        <Text marginTop={8} fontSize={12} color="red.500">
          no matches currently scheduled
        </Text>
      )}
      <Wrap marginTop={12} justify='center' spacing={8}>
        {result.map((r: any) => {
          let item = r.item || r;

          const winner = item.log.slice(-1);

          const score1 = winner === "0" ? 1 : 0;
          const score2 = winner === "1" ? 1 : 0;

          const name1 = `${item.collection1} #${_.truncate(item.player1.token_id, { length: 7 })}`;
          const name2 = `${item.collection2} #${_.truncate(item.player2.token_id, { length: 7 })}`;

          const label = (
            <Text textAlign="center" fontSize={10}>
              {name1}
              <br/>
              {name2}
            </Text>
          );

          const inBlocks = item.block ? parseInt(item.block, 10) - parseInt(blockNumber, 10) : 0;

          return (
            <WrapItem key={item.id}>
              <VStack>
                <Tooltip label={label}>
                  <HStack
                    padding={2}
                    borderWidth={2}
                    borderColor={LineColor}
                    borderRadius={100}
                    onClick={() => {navigate(`/season/0/matches/${item.id}`)}}
                    _hover={{
                      cursor: 'pointer',
                      borderColor: winnerColor,
                    }}
                  >
                    <Box
                      borderRadius="40px"
                      borderColor={LineColor}
                      borderWidth={2}
                    >
                      <Image
                        boxSize="40px"
                        borderRadius="40px"
                        src={item.player1.image_thumbnail_url}
                      />
                    </Box>
                    <Box>
                      <Text opacity={0.5}>
                        {score1} - {score2}
                      </Text>
                    </Box>
                    <Box
                      borderRadius="40px"
                      borderColor={LineColor}
                      borderWidth={2}
                    >
                      <Image
                        boxSize="40px"
                        borderRadius="40px"
                        src={item.player2.image_thumbnail_url}
                      />
                    </Box>
                  </HStack>
                </Tooltip>
                <Text opacity={0.5} fontSize={12} color={item.log ? "green.500" : "red.500"}>
                  block {item.block} {inBlocks > 0 ? `(${inBlocks})` : ''}
                </Text>
              </VStack>
            </WrapItem>
          );
        })}
      </Wrap>
    </>
  );
};
