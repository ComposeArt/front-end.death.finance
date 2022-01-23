import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
import Blockies from 'react-blockies';
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
  keyframes,
  VStack,
  Button,
} from "@chakra-ui/react";
import { navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri";
import { FaCheckCircle, FaBookDead } from "react-icons/fa";

import { SeasonHeader } from "./SeasonHeader";
import { NavLink } from "./NavLink";
import { ListCollections } from "./ListCollections";
import { PayloadContext, fetchAssets, streamOwnerFighters, remoteRegisterFighter } from "./utils/firebase";

export const SeasonCollections = (props: any) => {
  const [mounted, setMounted]: any = useState(false);
  const [loading, setLoading]: any = useState(true);
  const [owner, setOwner]: any = useState('');
  const [errorLoading, setErrorLoading]: any = useState(false);

  const [registering, setRegistering]: any = useState('');

  const address = props.address;

  const { account, collections } = useContext(PayloadContext);

  return (
    <Container maxW='container.md' centerContent>
      <SeasonHeader />
    </Container>
  );
};
