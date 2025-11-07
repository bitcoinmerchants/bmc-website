"use client";

import React from 'react';
import { Box, Heading, Text, Flex, Container, Link, SimpleGrid, Image } from '@chakra-ui/react';

const AlternativePaymentSection = () => {
    return (
        <Box 
            bg="white" 
            py={{ base: "60px", md: "80px", lg: "100px" }}
            px={{ base: "20px", md: "40px", lg: "60px" }}
            borderTop="1px solid #E0E0E0"
        >
            <Container maxW="1250px">
                {/* Introduction Text */}
                <Box mb={{ base: "40px", md: "50px" }}>
                    <Text 
                        fontSize={{ base: "16px", md: "18px" }}
                        lineHeight="1.7"
                        mb={5}
                        color="black"
                    >
                        <Text as="span" fontWeight="700">If you don't use Square</Text> or are outside the US, you'll need to pick a point-of-sale solution that accepts instant bitcoin payments. There are several to choose from.
                    </Text>

                    <Text 
                        fontSize={{ base: "16px", md: "18px" }}
                        lineHeight="1.7"
                        color="black"
                    >
                        We've selected some favorites that merchants have told us work well for them.
                    </Text>
                </Box>

                {/* Payment Solutions Grid */}
                <SimpleGrid 
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: "40px", md: "50px", lg: "60px" }}
                    mb={{ base: "40px", md: "50px" }}
                >
                    {/* IBEX Pay */}
                    <Box>
                        <Image 
                            src="/assets/CompanyImages/ibexLogo.png"
                            alt="IBEX Pay"
                            maxW="180px"
                            h="auto"
                            mb={4}
                        />
                        <Text 
                            fontSize={{ base: "16px", md: "18px" }}
                            lineHeight="1.7"
                            color="black"
                        >
                            IBEX Pay is a web-based bitcoin point-of-sale solution that works on any device with a web browser.
                        </Text>
                    </Box>

                    {/* Blink */}
                    <Box>
                        <Image 
                            src="/assets/CompanyImages/blinkLogo.png"
                            alt="Blink"
                            maxW="120px"
                            h="auto"
                            mb={4}
                        />
                        <Text 
                            fontSize={{ base: "16px", md: "18px" }}
                            lineHeight="1.7"
                            color="black"
                        >
                            Blink Wallet is a custodial bitcoin wallet for mobile with simple point-of-sale features and easy setup.
                        </Text>
                    </Box>

                    {/* Zaprite */}
                    <Box>
                        <Image 
                            src="/assets/CompanyImages/zapriteLogo.png"
                            alt="Zaprite"
                            maxW="160px"
                            h="auto"
                            mb={4}
                        />
                        <Text 
                            fontSize={{ base: "16px", md: "18px" }}
                            lineHeight="1.7"
                            color="black"
                        >
                            Zaprite lets you connect a third-party wallet to self-custody any bitcoin you receive.
                        </Text>
                    </Box>

                    {/* Swiss Bitcoin Pay */}
                    <Box>
                        <Image 
                            src="/assets/CompanyImages/swissBitcoinLogo.png"
                            alt="Swiss Bitcoin Pay"
                            maxW="200px"
                            h="auto"
                            mb={4}
                        />
                        <Text 
                            fontSize={{ base: "16px", md: "18px" }}
                            lineHeight="1.7"
                            color="black"
                        >
                            Swiss Bitcoin Pay is an option that many EU merchants have adopted. It allows automatic conversions to fiat currency.
                        </Text>
                    </Box>
                </SimpleGrid>

                {/* Bottom Section */}
                <Box>
                    <Text 
                        fontSize={{ base: "16px", md: "18px" }}
                        lineHeight="1.7"
                        mb={5}
                        color="black"
                    >
                        <Text as="span" fontWeight="700">Who makes the cut?</Text> We listen to merchants and spotlight solutions that are already popular and have a reputation for easy use. If there's a bitcoin point-of-sale solution we're missing,{' '}
                        <Link 
                            href="#" 
                            color="black" 
                            fontWeight="700"
                            textDecoration="underline"
                            _hover={{ color: "#00A651" }}
                        >
                            let us know
                        </Link>
                        .
                    </Text>

                    <Text 
                        fontSize={{ base: "16px", md: "18px" }}
                        lineHeight="1.7"
                        color="black"
                    >
                        If you want to learn more about getting up and running with one of these options, join our friendly{' '}
                        <Link 
                            href="#" 
                            color="black" 
                            fontWeight="700"
                            textDecoration="underline"
                            _hover={{ color: "#00A651" }}
                        >
                            Facebook Group
                        </Link>
                        .
                    </Text>
                </Box>
            </Container>
        </Box>
    );
};

export default AlternativePaymentSection;



