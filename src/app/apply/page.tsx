"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Header from "@/components/Header/Header";

// Turnstile test site key (always passes) — replace with real key in production
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    involvement: "",
    distribution: "",
    anythingElse: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  // Honeypot field
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    // Load Turnstile script
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad";
    script.async = true;
    document.head.appendChild(script);

    (window as unknown as Record<string, unknown>).onTurnstileLoad = () => {
      if (turnstileRef.current && (window as unknown as Record<string, { render: (el: HTMLDivElement, opts: Record<string, unknown>) => void }>).turnstile) {
        (window as unknown as Record<string, { render: (el: HTMLDivElement, opts: Record<string, unknown>) => void }>).turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (token: string) => setTurnstileToken(token),
          theme: "light",
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) return;

    if (!turnstileToken) {
      setErrorMsg("Please complete the verification check.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Box bg="white" minH="100vh">
        <Header />
        <Box
          pt={{ base: "120px", md: "150px" }}
          pb={{ base: "60px", md: "100px" }}
          px={{ base: "20px", md: "40px", lg: "60px" }}
        >
          <Container maxW="700px" textAlign="center">
            <Heading
              as="h1"
              fontSize={{ base: "32px", md: "40px" }}
              fontWeight="700"
              lineHeight="1.2"
              mb={6}
              color="black"
            >
              Application Received!
            </Heading>
            <Text fontSize={{ base: "16px", md: "20px" }} color="black" mb={8}>
              Thanks for applying to become a Local Champion. We'll review your
              application and be in touch.
            </Text>
            <Button
              as="a"
              href="/"
              bg="#FFC533"
              color="black"
              fontSize="16px"
              fontWeight="700"
              textTransform="uppercase"
              height="46px"
              px="40px"
              borderRadius="5px"
              border="2px solid #000"
              _hover={{ bg: "#E8B02E" }}
              transition="all 0.2s"
            >
              Back to Home
            </Button>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg="white" minH="100vh">
      <Header />
      <Box
        pt={{ base: "120px", md: "150px" }}
        pb={{ base: "60px", md: "100px" }}
        px={{ base: "20px", md: "40px", lg: "60px" }}
      >
        <Container maxW="700px">
          <Heading
            as="h1"
            fontSize={{ base: "32px", md: "40px" }}
            fontWeight="700"
            lineHeight="1.2"
            mb={8}
            color="black"
          >
            BMC Local Champion Application
          </Heading>

          {/* Intro copy */}
          <Text
            fontSize={{ base: "16px", md: "18px" }}
            lineHeight="1.6"
            mb={6}
            color="black"
          >
            The Bitcoin Merchant Community is looking for Local Champions,
            specialists who'll do whatever it takes to make bitcoin payments the
            default in their community.
          </Text>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            lineHeight="1.6"
            mb={6}
            color="black"
          >
            To help, the BMC will send you a free onboarding box containing 25
            plushies and leave-behind letters for distribution to merchants and
            fellow bitcoiners. There are only a few simple requirements:
          </Text>

          {/* Requirements */}
          <VStack align="start" spacing={5} mb={8}>
            <Box>
              <Text
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight="700"
                color="black"
                mb={1}
              >
                Active in your local bitcoin community
              </Text>
              <Text
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.5"
                color="black"
              >
                You regularly attend or organize meetups, onboard merchants, or
                participate in other local initiatives.
              </Text>
            </Box>

            <Box>
              <Text
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight="700"
                color="black"
                mb={1}
              >
                Connected locally
              </Text>
              <Text
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.5"
                color="black"
              >
                You have a good sense of where these kits should go and can
                follow through on getting them there.
              </Text>
            </Box>

            <Box>
              <Text
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight="700"
                color="black"
                mb={1}
              >
                Able to store the assets
              </Text>
              <Text
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.5"
                color="black"
              >
                You have a clean, safe place to store your leave-behinds until
                they're distributed. The box measures 26 x 18 x 17 inches and
                weighs 12 lbs. It's a lot of plushie.
              </Text>
            </Box>

            <Box>
              <Text
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight="700"
                color="black"
                mb={1}
              >
                Excel at giving feedback
              </Text>
              <Text
                fontSize={{ base: "15px", md: "17px" }}
                lineHeight="1.5"
                color="black"
              >
                You are willing to share photos and success stories with other
                bitcoiners and Local Champions in the BMC Discord. This will
                help us measure the project's impact and gauge the need for more
                leave-behinds.
              </Text>
            </Box>
          </VStack>

          <Text
            fontSize={{ base: "16px", md: "18px" }}
            lineHeight="1.6"
            mb={4}
            color="black"
          >
            If this sounds like you, apply now. We'll be in touch.
          </Text>

          <Text
            fontSize={{ base: "14px", md: "15px" }}
            lineHeight="1.5"
            mb={10}
            color="gray.600"
            fontStyle="italic"
          >
            Note: Local Champions can be anywhere in the world. However, because
            we're still learning how to scale this community, U.S. participants
            may be prioritized due to shipping costs.
          </Text>

          {/* Form */}
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5} align="stretch">
              {/* Honeypot - hidden from humans */}
              <Box position="absolute" left="-9999px" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </Box>

              <FormControl isRequired>
                <FormLabel
                  fontSize={{ base: "15px", md: "16px" }}
                  fontWeight="600"
                  color="black"
                >
                  Name
                </FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  size="lg"
                  borderColor="#E0E0E0"
                  borderRadius="5px"
                  _focus={{ borderColor: "#000", boxShadow: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel
                  fontSize={{ base: "15px", md: "16px" }}
                  fontWeight="600"
                  color="black"
                >
                  Email
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  size="lg"
                  borderColor="#E0E0E0"
                  borderRadius="5px"
                  _focus={{ borderColor: "#000", boxShadow: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel
                  fontSize={{ base: "15px", md: "16px" }}
                  fontWeight="600"
                  color="black"
                >
                  Where are you located?
                </FormLabel>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, State/Country"
                  size="lg"
                  borderColor="#E0E0E0"
                  borderRadius="5px"
                  _focus={{ borderColor: "#000", boxShadow: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel
                  fontSize={{ base: "15px", md: "16px" }}
                  fontWeight="600"
                  color="black"
                >
                  How are you currently involved in your local bitcoin
                  community?
                </FormLabel>
                <Text fontSize="13px" color="gray.500" mb={2}>
                  Links are welcome but not required.
                </Text>
                <Textarea
                  name="involvement"
                  value={formData.involvement}
                  onChange={handleChange}
                  placeholder="Tell us about your involvement..."
                  size="lg"
                  rows={4}
                  borderColor="#E0E0E0"
                  borderRadius="5px"
                  _focus={{ borderColor: "#000", boxShadow: "none" }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel
                  fontSize={{ base: "15px", md: "16px" }}
                  fontWeight="600"
                  color="black"
                >
                  If you became a Local Champion, how would you distribute the
                  plushies and leave-behind letters to bitcoiners and merchants?
                </FormLabel>
                <Textarea
                  name="distribution"
                  value={formData.distribution}
                  onChange={handleChange}
                  placeholder="Describe your distribution plan..."
                  size="lg"
                  rows={4}
                  borderColor="#E0E0E0"
                  borderRadius="5px"
                  _focus={{ borderColor: "#000", boxShadow: "none" }}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  fontSize={{ base: "15px", md: "16px" }}
                  fontWeight="600"
                  color="black"
                >
                  Anything else we should know about you or why you want to
                  become a Local Champion?
                </FormLabel>
                <Textarea
                  name="anythingElse"
                  value={formData.anythingElse}
                  onChange={handleChange}
                  placeholder="Optional"
                  size="lg"
                  rows={3}
                  borderColor="#E0E0E0"
                  borderRadius="5px"
                  _focus={{ borderColor: "#000", boxShadow: "none" }}
                />
              </FormControl>

              {/* Turnstile widget */}
              <Box ref={turnstileRef} />

              {status === "error" && (
                <Alert status="error" borderRadius="5px">
                  <AlertIcon />
                  {errorMsg}
                </Alert>
              )}

              <Button
                type="submit"
                bg="#FFC533"
                color="black"
                fontSize="16px"
                fontWeight="700"
                textTransform="uppercase"
                width="100%"
                height="46px"
                borderRadius="5px"
                border="2px solid #000"
                _hover={{ bg: "#E8B02E" }}
                transition="all 0.2s"
                isLoading={status === "submitting"}
                loadingText="Submitting..."
              >
                Submit Application
              </Button>
            </VStack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
