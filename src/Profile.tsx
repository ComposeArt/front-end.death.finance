import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import moment from "moment";
// import Blockies from 'react-blockies';
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
} from "@chakra-ui/react";
import { RouteComponentProps, navigate } from "@reach/router";
import { RiSwordFill } from "react-icons/ri"

import { LinkButton } from "./LinkButton";
import grim from './images/mgrim-flip.png';
import { PayloadContext, fetchAssets } from "./utils/firebase";

export const Profile = (props: any) => {
  // const toast = useToast();
  // const lineColor = useColorModeValue('gray.500', 'white.500');
  // const opacityColor = useColorModeValue('gray.800', 'white');
  // const backgroundColor = useColorModeValue('white', 'gray.800');
  // const brightColor = useColorModeValue('gray.800', 'white');

  // const [loading, setLoading]: any = useState(true);
  // const [players, setPlayers]: any = useState([]);
  // const [owner, setOwner]: any = useState({});

  const address = props.address;

  const { account, collections, fighters } = useContext(PayloadContext);

  console.log(address, account)

  useEffect(() => {
    document.title = 'Profile';
  }, []);

  useEffect(() => {
    if (!address && account) {
      navigate(`/profile/${account}`)
    }
  }, [account, address]);

  // useEffect(() => {
  //   (async function getInitialData() {
  //     setLoading(true);

  //     try {
  //       // const assets = await fetchAssets(address);
  //       // const filtered = _.filter(assets, (a: any) => _.find(collections, (c: any) => c.id === a.collection.slug));

  //       // console.log(assets);

  //       // setOwner(_.get(assets, '[0].owner.user.username', '-'));
  //       // setPlayers(filtered);
  //     } catch (error) {
  //       console.log(error);
  //       toast({
  //         title: 'failed to load nfts',
  //         status: 'error',
  //         isClosable: true,
  //         duration: 3000,
  //       });
  //     }

  //     setLoading(false);
  //   })();
  // }, [address, collections, toast]);

  // const formatAddress = address ? `${address.slice(0, 6)}...${address.slice(address.length - 4, address.length)}` : '-';

  if (!address && !account) {

  }
  return (
    <Container maxW='container.md' centerContent>
      {/* <Center
        height="120px"
        width="120px"
        borderRadius='50%'
        borderWidth={2}
        borderColor={brightColor}
        marginTop={12}
      >
        <Blockies
          seed={address}
          size={12}
          scale={9}
          color={lineColor}
          bgColor={backgroundColor}
        />
      </Center> */}
      {/* <Heading
        size='sm'
        marginTop={8}
        textAlign="center"
      >
        {owner}
      </Heading> */}
      {/* <Text
        fontSize={12}
        textAlign="center"
        padding={4}
        borderBottomColor={lineColor}
        borderBottomWidth={1}
      >
        {formatAddress}
      </Text> */}
      {/* <Wrap marginTop={12} justify='center' spacing={12}>
        {players.map((p: any) => {
          return (
            <WrapItem key={p.id} margin={4}>
              <Box
                borderRadius="150px"
                borderColor={lineColor}
                borderWidth={2}
                onClick={() => navigate(`/seasons/0/fighters/${p.id}`)}
                _hover={{
                  cursor: "pointer",
                  borderColor: opacityColor,
                }}
              >
                <Image
                  boxSize="150px"
                  borderRadius="150px"
                  src={p.image_preview_url}
                />
              </Box>
            </WrapItem>
          );
        })}
      </Wrap> */}
    </Container>
  );
};
