import React, { useState } from "react";
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
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  GiPunchBlast,
  GiPunch,
  GiShield,
  GiHealthNormal,
} from "react-icons/gi";
import { FaCrown, FaCheckCircle } from "react-icons/fa";

import logo from './images/logo.png';

import { elements } from "./utils/fighting";

export const Fighter = ({ fighter, color, winner = false }: any) => {
  const LineColor = useColorModeValue('gray.500', 'white.500');
  const winnerColor = useColorModeValue('gray.800', 'white');
  const useTooltipTouch = useBreakpointValue({ base: true, md: false });

  const fighterSpecialElement: any = fighter.special_element || 0;
  const fighterElement: any = fighter.element || 0;

  const [activeTooltip, setActiveTooltip]: any = useState('');

  const CustomTooltip = (props: any) => {
    if (useTooltipTouch) {
      return (
        <Tooltip
          isOpen={props.activeType === props.type}
          {...props}
        />
      );
    } else {
      return <Tooltip {...props} />;
    }
  };

  return (
    <VStack>
    {winner && (
      <Box position="absolute" marginTop={-10}>
        <FaCrown fontSize={32} />
      </Box>
    )}
    <VStack spacing={4}>
      <Box position="relative" marginBottom={4}>
        <Box
          marginTop={winner ? -2 : 0}
          borderRadius={{ base: "100px", md: 150 }}
          borderColor={winner ? winnerColor : LineColor}
          borderWidth={2}
          onClick={() => {fighter.owner && window.open(`/seasons/0/fighters/${fighter.collection}/${fighter.token_id}`, "_blank")}}
          _hover={{
            borderColor: fighter.owner || winner ? winnerColor : LineColor,
            cursor: fighter.owner ? 'pointer' : 'default',
          }}
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
        {fighter.owner && (
          <Box position="absolute" right="10px" bottom="0px">
            <FaCheckCircle fontSize={32} />
          </Box>
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
          {fighter.collection ? `${fighter.collection} #${_.truncate(fighter.token_id, { length: 7 })}` : '-'}
        </Text>
      </Box>
      <HStack marginTop={8} align="center" spacing={4}>
        <CustomTooltip
          borderRadius={100}
          fontSize={10}
          label={`s-element | ${elements[fighterSpecialElement].name}`}
          type="special-element"
          activeType={activeTooltip}
          onOpen={() => {
            setTimeout(() => {
              setActiveTooltip('');
            }, 3000);
          }}
        >
          <IconButton
            size="md"
            fontSize={20}
            color="current"
            borderRadius={100}
            icon={elements[fighterSpecialElement].icon}
            aria-label={elements[fighterSpecialElement].name}
            onClick={() => {
              if (activeTooltip === 'special-element') {
                setActiveTooltip('');
              } else {
                setActiveTooltip('special-element');
              }
            }}
            _hover={{
              cursor: 'default'
            }}
          />
        </CustomTooltip>
        <CustomTooltip
          borderRadius={100}
          fontSize={10}
          label={`element | ${elements[fighterElement].name}`}
          type="element"
          activeType={activeTooltip}
          onOpen={() => {
            setTimeout(() => {
              setActiveTooltip('');
            }, 3000);
          }}
        >
          <IconButton
            size="md"
            fontSize={20}
            color="current"
            borderRadius={100}
            icon={elements[fighterElement].icon}
            aria-label={elements[fighterElement].name}
            onClick={() => {
              if (activeTooltip === 'element') {
                setActiveTooltip('');
              } else {
                setActiveTooltip('element');
              }
            }}
            _hover={{
              cursor: 'default'
            }}
          />
        </CustomTooltip>
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <CustomTooltip
          borderRadius={100}
          fontSize={10}
          label={`s-attack | ${fighter.special_attack}`}
          type="special-attack"
          activeType={activeTooltip}
          onOpen={() => {
            setTimeout(() => {
              setActiveTooltip('');
            }, 3000);
          }}
        >
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiPunchBlast />}
            aria-label={'Special Attack'}
            onClick={() => {
              if (activeTooltip === 'special-attack') {
                setActiveTooltip('');
              } else {
                setActiveTooltip('special-attack');
              }
            }}
            _hover={{
              cursor: 'default'
            }}
          />
        </CustomTooltip>
        <Progress
          value={(fighter.special_attack / 15) * 100}
          colorScheme={color}
          width={{ base: "80px", md: 130 }}
          borderRadius={100}
        />
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <CustomTooltip
          borderRadius={100}
          fontSize={10}
          label={`attack | ${fighter.attack}`}
          type="attack"
          activeType={activeTooltip}
          onOpen={() => {
            setTimeout(() => {
              setActiveTooltip('');
            }, 3000);
          }}
        >
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiPunch />}
            aria-label={'Attack'}
            onClick={() => {
              if (activeTooltip === 'attack') {
                setActiveTooltip('');
              } else {
                setActiveTooltip('attack');
              }
            }}
            _hover={{
              cursor: 'default'
            }}
          />
        </CustomTooltip>
        <Progress
          value={(fighter.attack / 15) * 100}
          colorScheme={color}
          width={{ base: "80px", md: 130 }}
          borderRadius={100}
        />
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <CustomTooltip
          borderRadius={100}
          fontSize={10}
          label={`defense | ${fighter.defense}`}
          type="defense"
          activeType={activeTooltip}
          onOpen={() => {
            setTimeout(() => {
              setActiveTooltip('');
            }, 3000);
          }}
        >
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiShield />}
            aria-label={'Defense'}
            onClick={() => {
              if (activeTooltip === 'defense') {
                setActiveTooltip('');
              } else {
                setActiveTooltip('defense');
              }
            }}
            _hover={{
              cursor: 'default'
            }}
          />
        </CustomTooltip>
        <Progress
          value={(fighter.defense / 15) * 100}
          colorScheme={color}
          width={{ base: "80px", md: 130 }}
          borderRadius={100}
        />
      </HStack>
      <HStack marginTop={8} align="center" spacing={4}>
        <CustomTooltip
          borderRadius={100}
          fontSize={10}
          label={`health | ${fighter.health}`}
          type="health"
          activeType={activeTooltip}
          onOpen={() => {
            setTimeout(() => {
              setActiveTooltip('');
            }, 3000);
          }}
        >
          <IconButton
            size="sm"
            fontSize={18}
            color="current"
            borderRadius={100}
            icon={<GiHealthNormal />}
            aria-label={'Health'}
            onClick={() => {
              if (activeTooltip === 'health') {
                setActiveTooltip('');
              } else {
                setActiveTooltip('health');
              }
            }}
            _hover={{
              cursor: 'default'
            }}
          />
        </CustomTooltip>
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
