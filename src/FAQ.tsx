import React, { useEffect, useState } from "react";
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

const Question = (props: any) => {
  const LineColor = useColorModeValue('gray.500', 'white.500');

  return (
    <VStack
      marginTop={8}
      align="center"
      justify="center"
      borderBottomWidth={1}
      borderColor={LineColor}
    >
      <HStack
        align="center"
        justify="space-between"
        marginBottom={4}
      >
        <Text fontSize="sm">
          {props.question}
        </Text>
        <IconButton
          size="sm"
          fontSize="md"
          variant="ghost"
          color="current"
          onClick={() => {props.setOpenQuestion(props.type)}}
          icon={props.openQuestion === props.type ? <IoMdArrowUp /> : <IoMdArrowDown /> }
          aria-label={`Question Icon`}
        />
      </HStack>
      <Fade in={props.openQuestion === props.type} unmountOnExit={true}>
        <Text fontSize={12} opacity={0.5} marginBottom={4}>
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

  return (
    <Container maxW='container.md' centerContent>
      <Heading size='lg' marginTop={12} textAlign="center">
        Frequently Asked Questions
      </Heading>
      <Text marginTop={4}>
        “let's talk about nft fight club”
      </Text>
      <Text fontSize={12} color="red.500" marginTop={4}>
        season_0 preseason starts {moment().to(moment('2022-02-10', 'YYYY-MM-DD'))}
      </Text>
      <Question
        question="1. Why did you make this?"
        answer="Because, while plenty of people are launching new NFT collections, almost none of them allow you to do anything with the NFT aside from own or trade it. We wanted to create a project that made peoples’ existing NFTs more fun and gave them more utility."
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="1"
      />
      <Question
        question="2. What chains do you support?"
        answer="Ethereum; this is obviously migratable to any EVM-compatible chain, but we’re a small team and aren’t about to ruin the project trying to make everyone happy. That said, if you pay us, we’ll consider :)"
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="2"
      />
      <Question
        question="3. Why these 100 collections?"
        answer="We picked the top 100 collections that have good distributions of traits and create a normalized power distribution between their fighters. In the future we will let the community decide which collections get included."
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="3"
      />
      <Question
        question="4. What is ‘season_0’?"
        answer="This is just the first season of the fight club, there will be more seasons to come with rule updates made by community members who have received their Grim for participating."
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="4"
      />
      <Question
        question="5. How can I participate?"
        answer="Register your NFTs as fighters, win games during the preseason and hopefully make it to the final tournament!"
        setOpenQuestion={setOpenQuestion}
        openQuestion={openQuestion}
        type="5"
      />
    </Container>
  );
};