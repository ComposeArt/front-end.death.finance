import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
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

import { PayloadContext, getFighter } from "./utils/firebase";

export const SeasonFighter = (props: any) => {
  const toast = useToast();
  const lineColor = useColorModeValue('gray.500', 'white.500');
  const brightColor = useColorModeValue('gray.800', 'white');

  const fighterId = props.id;

  const [loading, setLoading]: any = useState(true);
  const [fighter, setFighter]: any = useState({});
  const [errorLoading, setErrorLoading]: any = useState(false);

  const { account } = useContext(PayloadContext);

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        if (fighterId) {
          const result = await getFighter(fighterId);
          setFighter(result);
        }
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
      setLoading(false);
    })();
  }, [fighterId]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load fighter',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  console.log(fighter);

  return (
    <Container maxW='container.md' centerContent>

    </Container>
  );
};
