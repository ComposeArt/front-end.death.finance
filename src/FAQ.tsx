import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import {
  Heading,
  Container,
  HStack,
  Text,
  useColorModeValue,
  VStack,
  Fade,
  IconButton,
} from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

import { PayloadContext } from "./utils/firebase";

const Question = (props: any) => {
  const LineColor = useColorModeValue('gray.500', 'white.500');

  return (
    <VStack
      marginTop={8}
      align="space-between"
      justify="center"
      borderBottomWidth={1}
      borderColor={LineColor}
      width="100%"
    >
      <HStack
        align="center"
        justify="space-between"
        marginBottom={4}
        onClick={() => {props.setOpenQuestion(props.type)}}
        _hover={{
          cursor: 'pointer',
        }}
      >
        <Text fontSize="md">
          {props.question}
        </Text>
        <IconButton
          size="sm"
          fontSize="md"
          variant="ghost"
          color="current"
          icon={props.openQuestion === props.type ? <IoMdArrowUp /> : <IoMdArrowDown /> }
          aria-label={`Question Icon`}
          opacity={0.5}
        />
      </HStack>
      <Fade in={props.openQuestion === props.type} unmountOnExit={true}>
        <Text fontSize="md" opacity={0.5} marginBottom={4}>
          {props.answer}
        </Text>
      </Fade>
    </VStack>
  );
};

export const FAQ = (props: RouteComponentProps) => {
  useEffect(() => {
    document.title = 'FAQ | NFT Fight Club';
  }, []);

  const [openQuestion, setOpenQuestion]: any = useState('1');
  const { season } = useContext(PayloadContext);

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='lg' marginTop={12} textAlign="center">
        Frequently Asked Questions
      </Heading>
      <Text marginTop={4}>
        “let's talk about nft fight club”
      </Text>
      <Text fontSize={12} color="red.500" marginTop={4}>
        {season.isDev ? `registration is always open` : `registration ends ${moment().to(moment(season.registration_ends, 'YYYY-MM-DD'))}`}
      </Text>
      <Question
        question="Why did you make this?"
        answer="Because, while plenty of people are launching new NFT collections, almost none of them allow you to do anything with the NFT aside from own or trade it. We wanted to create a project that made peoples' existing NFTs more fun and gave them more utility."
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="1"
      />
      <Question
        question="What is 'season_0'?"
        answer="This is just the first season of the fight club, there will be more seasons to come with rule updates made by community members who have received their Grim for participating."
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="4"
      />
      <Question
        question="How can I participate?"
        answer="Register your NFTs as fighters, win games during the preseason and hopefully make it to the final tournament!"
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="5"
      />
      <Question
        question="What are Grims?"
        answer="Grims are special trainers for the NFT fight Club and will be used to upgrade your fighters in the future!"
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="6"
      />
    </Container>
  );
};
