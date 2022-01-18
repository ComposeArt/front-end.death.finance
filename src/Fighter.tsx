import React from "react";
import _ from "lodash";
import {
  HStack,
  Image,
  Box,
  Text,
  useColorModeValue,
  VStack,
  IconButton,
  Tooltip,
  Progress,
} from "@chakra-ui/react";
import {
  GiPunchBlast,
  GiPunch,
  GiShield,
  GiHealthNormal,
} from "react-icons/gi";
import { FaCrown } from "react-icons/fa";

import logo from './images/logo.png';

import { elements } from "./utils/fighting";

export const Fighter = ({ fighter, color, winner = false }: any) => {
  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');

  const fighterSpecialElement: any = fighter.special_element || 0;
  const fighterElement: any = fighter.element || 0;

  return (
    <VStack>
    {winner && (
      <Box position="absolute" marginTop={-8}>
        <FaCrown fontSize={32} />
      </Box>
    )}
    <VStack spacing={4}>
      <Box
        borderRadius={{ base: "100px", md: 150 }}
        borderColor={winner ? winnerColor : LineColor}
        borderWidth={2}
      >
        {fighter.image_preview_url ? (
          <Image
            boxSize={{ base: "100px", md: 150 }}
            borderRadius={{ base: "100px", md: 150 }}
            src={fighter.image_preview_url}
          />
        ) : (
          <Image
            boxSize={{ base: "100px", md: 150 }}
            borderRadius={{ base: "100px", md: 150 }}
            src={logo}
          />
        )}
      </Box>
      <Box
        width={{ base: "100px", md: 150 }}
        height="50px"
        textAlign="center"
      >
        <Text
          fontSize={{ base: 10, md: 12 }}
          textDecoration="underline"
          opacity={0.5}
          onClick={()=> window.open(fighter.permalink, "_blank")}
          _hover={{
            cursor: 'pointer',
            opacity: 1,
          }}
        >
          {`${fighter.collection} #${_.truncate(fighter.token_id, { length: 7 })}`}
        </Text>
      </Box>
      <HStack marginTop={8} align="center" spacing={4}>
        <Tooltip borderRadius={100} fontSize={10} label={`s-element | ${elements[fighterSpecialElement].name}`}>
          <IconButton
            size="md"
            fontSize={20}
            color="current"
            borderRadius={100}
            icon={elements[fighterSpecialElement].icon}
            aria-label={elements[fighterSpecialElement].name}
            _hover={{
              cursor: 'default'
            }}
          />
        </Tooltip>
        <Tooltip borderRadius={100} fontSize={10} label={`element | ${elements[fighterElement].name}`}>
          <IconButton
            size="md"
            fontSize={20}
            color="current"
            borderRadius={100}
            icon={elements[fighterElement].icon}
            aria-label={elements[fighterElement].name}
            _hover={{
              cursor: 'default'
            }}
          />
        </Tooltip>
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <Tooltip borderRadius={100} fontSize={10} label={`s-attack | ${fighter.special_attack}`}>
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiPunchBlast />}
            aria-label={'Special Attack'}
            _hover={{
              cursor: 'default'
            }}
          />
        </Tooltip>
        <Progress
          value={(fighter.special_attack / 15) * 100}
          colorScheme={color}
          width={{ base: "80px", md: 130 }}
          borderRadius={100}
        />
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <Tooltip borderRadius={100} fontSize={10} label={`attack | ${fighter.attack}`}>
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiPunch />}
            aria-label={'Attack'}
            _hover={{
              cursor: 'default'
            }}
          />
        </Tooltip>
        <Progress
          value={(fighter.attack / 15) * 100}
          colorScheme={color}
          width={{ base: "80px", md: 130 }}
          borderRadius={100}
        />
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <Tooltip borderRadius={100} fontSize={10} label={`defense | ${fighter.defense}`}>
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiShield />}
            aria-label={'Defense'}
            _hover={{
              cursor: 'default'
            }}
          />
        </Tooltip>
        <Progress
          value={(fighter.defense / 15) * 100}
          colorScheme={color}
          width={{ base: "80px", md: 130 }}
          borderRadius={100}
        />
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <Tooltip borderRadius={100} fontSize={10} label={`health | ${fighter.health}`}>
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiHealthNormal />}
            aria-label={'Health'}
            _hover={{
              cursor: 'default'
            }}
          />
        </Tooltip>
        <Progress
          value={(fighter.health / 15) * 100}
          colorScheme={color}
          width={{ base: "80px", md: 130 }}
          borderRadius={100}
        />
      </HStack>
    </VStack>
    </VStack>
  );
};
