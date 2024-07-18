import { Box, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
      <Box
          p={5} // Padding around the card
          shadow="md" // Medium shadow around the card
          borderWidth="1px" // Border to distinguish the card
          borderRadius="lg" // Rounded corners
          overflow="hidden" // Keeps everything inside the border
          bg="white" // Background color
          transition="transform 0.2s" // Smooth transformation on hover
          _hover={{
              transform: "translateY(-5px)", // Slightly raise the card on hover
              shadow: "lg" // Larger shadow on hover
          }}
      >
          <VStack spacing={4} alignItems="start">
              <Image borderRadius="lg" src={imageSrc} alt={title} objectFit="cover" />
              <VStack spacing={1} px={2}>
                  <Heading size="md" textAlign="left" color={"black"} >{title}</Heading>
                  <Text fontSize="sm" color={"black"}>{description}</Text>
              </VStack>
              <HStack px={2} py={1}>
                  <Text fontSize="sm" color="black" fontWeight="semibold">See more</Text>
                  <FontAwesomeIcon icon={faArrowRight} color={"black"} />
              </HStack>
          </VStack>
      </Box>
  )
};

export default Card;
