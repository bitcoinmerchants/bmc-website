import React from 'react';
import { Box, Container, Flex, Image, Text, Link as ChakraLink } from '@chakra-ui/react';

const Header = () => {
    return (
        <Box 
            bg="white"
            position={{ base: "relative", xl: "fixed" }}
            top={{ base: "auto", xl: "0" }}
            left={{ base: "auto", xl: "0" }}
            right={{ base: "auto", xl: "0" }}
            zIndex={{ base: "auto", xl: "1000" }}
        >
            <Container>
                <Flex
                    as="nav"
                    align="center"
                    justify="space-between"
                    wrap="nowrap" 
                    padding={{ base: "1rem 1rem", md: "1.5rem 2rem", lg: "1.5rem 2rem", xl: "1.5rem 0rem" }}
                    color="gray.800"
                >
                {/* Logo Section */}
                <Flex align="center">
                    <Image 
                        src="/assets/HeaderImages/logo.svg" 
                        alt="Bitcoin Merchant Community Logo" 
                        h={{ base: "40px", md: "50px", lg: "50px", xl: "60px" }} 
                    />
                </Flex>

                {/* Right Side Link */}
                <Flex align="center">
                    <ChakraLink
                        href="#download-kit"
                        display={{ base: "none", md: "block" }}
                        fontSize={{ base: "14px", md: "16px", lg: "16px", xl: "18px" }}
                        fontWeight="400"
                        color="black"
                        textDecoration="underline"
                        sx={{
                            scrollBehavior: 'smooth'
                        }}
                        _hover={{
                            textDecoration: "none",
                            opacity: 0.8
                        }}
                    >
                        Help us spread the word. Download a kit.
                    </ChakraLink>
                </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;

