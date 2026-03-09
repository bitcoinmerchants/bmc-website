"use client";

import React from 'react';
import { Box, Heading, Text, Flex, Container, Link, Image } from '@chakra-ui/react';

const LocalChampionSection = () => {
    return (
        <Box 
            bg="#F5F5F5"
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
                    {/* Right Side (on desktop) - Text Content */}
                    <Box
                        flex="1"
                        maxW={{ base: "100%", xl: "600px" }}
                        order={{ base: 1, xl: 2 }}
                    >
                        <Heading 
                            as="h2"
                            fontSize={{ base: "32px", md: "40px", lg: "40px", xl: "32px" }}
                            fontWeight="700"
                            lineHeight="1.2"
                            mb={6}
                            color="black"
                        >
                            Become a Local Champion
                        </Heading>

                        <Text
                            fontSize={{ base: "16px", md: "20px" }}
                            lineHeight="1.4"
                            mb={4}
                            maxW={{ base: "100%", xl: "450px" }}
                            color="black"
                        >
                            Don't see a Local Champion near you? That might be your sign to become one.
                        </Text>

                        <Text
                            fontSize={{ base: "16px", md: "20px" }}
                            lineHeight="1.4"
                            mb={6}
                            maxW={{ base: "100%", xl: "440px" }}
                            color="black"
                        >
                            We're looking for natural leaders with deep connections to their local community. If accepted, we'll send you a box of free Itty Bitty plushies and leave-behind materials to help you onboard merchants and distribute to bitcoiners doing the same.
                        </Text>

                        <Link
                            href="/apply"
                            fontSize={{ base: "16px", md: "20px" }}
                            fontWeight="700"
                            color="black"
                            textDecoration="underline"
                            display="inline-flex"
                            alignItems="center"
                            gap={2}
                            _hover={{ color: "#00A651" }}
                        >
                            Apply to become a Local Champion
                        </Link>
                    </Box>

                    {/* Left Side (on desktop) - Itty Bitty Image */}
                    <Box
                        flex="1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        order={{ base: 2, xl: 1 }}
                    >
                        <Image
                            src="/assets/LocalChampionImages/LocalChampion.png"
                            alt="Itty Bitty Bitcoin mascot"
                            maxW={{ base: "280px", sm: "320px", md: "350px", lg: "400px", xl: "550px" }}
                            w="100%"
                            h="auto"
                            loading="lazy"
                        />
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
};

export default LocalChampionSection;

