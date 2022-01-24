import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import { useFuzzy } from 'react-use-fuzzy';
import {
  Container,
  Image,
  Box,
  Text,
  useColorModeValue,
  useToast,
  Wrap,
  WrapItem,
  VStack,
  InputGroup,
  InputLeftAddon,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { FaCheckCircle, FaSearch } from "react-icons/fa";

import { SeasonHeader } from "./SeasonHeader";
import { getAllFighters, PayloadContext } from "./utils/firebase";

export const SeasonFighters = (props: any) => {
  const toast = useToast();
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const brightColor = useColorModeValue('gray.800', 'white');

  const { account } = useContext(PayloadContext);

  const [loading, setLoading]: any = useState(true);
  const [fighters, setFighters]: any = useState([]);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { result, keyword, search } = useFuzzy(fighters, {
    keys: ['name', 'collection', 'player.token_id', 'player.name', 'owner', 'player.description'],
  });

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        const allFighters = await getAllFighters();

        setFighters(allFighters.map((f:any) => {
          return {
            ...f,
            name: `${f.collection} #${_.truncate(f.player.token_id, { length: 7 })}`,
          };
        }));
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load fighters',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  useEffect(() => {
    document.title = 'Fighters | Season 0 | NFT Fight Club';
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
          children={loading ? <Spinner size='sm' /> : <FaSearch />}
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
                    onClick={() => {navigate(`/season/0/fighters/${item.id}`)}}
                    _hover={{
                      borderColor: brightColor,
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      boxSize="150px"
                      borderRadius="150px"
                      src={item.player.image_preview_url}
                    />
                  </Box>
                  <Box color={account === item.owner ? 'green.500' : 'current'} position="absolute" right="10px" bottom="0px">
                    <FaCheckCircle fontSize={32} />
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
                    onClick={()=> window.open(item.player.permalink, "_blank")}
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
