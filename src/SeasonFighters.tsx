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
import { FaSearch } from "react-icons/fa";
import { FighterPortrait } from './Fighter';

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
        const orderedFighters = allFighters.filter((f: any) => !f.is_invalid).map((f:any) => {
          return {
            ...f,
            name: `${f.collection} #${_.truncate(f.player.token_id, { length: 7 })}`,
          };
        });

        setFighters(orderedFighters);
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

          const formatFighter = {
            ...item.player,
            owner: item.owner,
            timestamp: item.timestamp,
            is_invalid: item.is_invalid,
            is_doping: item.is_doping,
          };

          return (
            <WrapItem key={formatFighter.id} margin={4}>
              <FighterPortrait fighter={formatFighter} big />
            </WrapItem>
          );
        })}
      </Wrap>
    </Container>
  );
};
