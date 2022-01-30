import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import {
  Heading,
  Container,
  HStack,
  Image,
  Box,
  Text,
  useColorModeValue,
  useToast,
  Wrap,
  WrapItem,
  Center,
  VStack,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import logoSmall from './images/logo-small.png';

import { PayloadContext, getBracketMatches } from "./utils/firebase";

export const SeasonTournamentMatch = (props: any) => {
  const toast = useToast();

  const [loading, setLoading]: any = useState(true);
  const [errorLoading, setErrorLoading]: any = useState(false);

  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');
  const bgColor = useColorModeValue('#1A202C', 'white');

  const [match, setMatch]: any = useState({});

  const bracket = props.id || 'alpha';
  const matchId = props.matchId;

  const { account } = useContext(PayloadContext);

  useEffect(() => {
    document.title = `${bracket} | Tournament | Season 0 | NFT Fight Club`;
  }, [bracket]);

  useEffect(() => {
    (async function getInitialData() {
      setLoading(true);
      try {
        // TODO get match from bracket and id

        // setMatch();
      } catch (error) {
        console.log(error);
        setErrorLoading(true);
      }
      setLoading(false);
    })();
  }, [bracket]);

  useEffect(() => {
    if (errorLoading) {
      setErrorLoading(false);
      toast({
        title: 'failed to load match',
        status: 'error',
        isClosable: true,
        duration: 3000,
      });
    }
  }, [errorLoading, toast]);

  return (
    <Container maxW='container.md' centerContent>

    </Container>
  );
};
