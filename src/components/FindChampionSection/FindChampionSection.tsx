"use client";

import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";
import { champions } from "./champions";

const ChampionMap = dynamic(() => import("./ChampionMap"), {
  ssr: false,
  loading: () => (
    <Box
      h="100%"
      minH="350px"
      bg="gray.100"
      borderRadius="12px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      border="2px solid #E0E0E0"
    >
      <Text color="gray.500">Loading map…</Text>
    </Box>
  ),
});

const FindChampionSection = () => {
  return (
    <Box
      id="find-champion"
      bg="white"
      py={{ base: "60px", md: "80px", lg: "100px" }}
      px={{ base: "20px", md: "40px", lg: "60px" }}
    >
      <Container>
        <Flex
          direction={{ base: "column", xl: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: "40px", lg: "40px", xl: "80px" }}
        >
          {/* Left Side - Text Content */}
          <Box
            flex="1"
            maxW={{ base: "100%", xl: "600px" }}
            order={{ base: 1, xl: 1 }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "32px", md: "40px", lg: "40px", xl: "32px" }}
              fontWeight="700"
              lineHeight="1.2"
              mb={6}
              color="black"
            >
              Find a Local Champion
            </Heading>

            <Text
              fontSize={{ base: "16px", md: "20px" }}
              lineHeight="1.4"
              mb={4}
              maxW={{ base: "100%", xl: "450px" }}
              color="black"
            >
              Local Champions are community leaders helping spread the word
              about how bitcoin can benefit small businesses. They have free
              Itty Bitty plushies and leave-behind materials to help you get
              started.
            </Text>

            <Text
              fontSize={{ base: "16px", md: "20px" }}
              lineHeight="1.4"
              maxW={{ base: "100%", xl: "450px" }}
              color="black"
            >
              Use the map to find a Local Champion near you. Whether
              you're a merchant interested in accepting bitcoin or a bitcoiner
              looking to get involved locally, reach out to grab some handouts
              and start the conversation.
            </Text>
          </Box>

          {/* Right Side - Map */}
          <Box
            flex="1"
            order={{ base: 2, xl: 2 }}
            w="100%"
            maxW={{ base: "100%", xl: "550px" }}
          >
            <ChampionMap champions={champions} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default FindChampionSection;
