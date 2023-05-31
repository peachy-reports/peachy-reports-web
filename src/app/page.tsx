"use client";

import { Image, Text, Button, Link, Container } from "@chakra-ui/react";
export default function Home() {
  return (
    <Container>
      <Image
        borderRadius="full"
        boxSize="150px"
        src="/logo.png"
        alt="Peachy"
        css="display:inline;"
      />
      <Text fontSize={75} css="position:relative;top:-50px;display:inline;color:#ffab40;">
        Peachy
      </Text>
      <Text fontSize={24}>
        We make sustainability reporting quick, easy, and accessible.{" "}
      </Text>
      <br />
      <h4>We&apos;ll generate your sustainability report in 15 minutes. </h4>
      <h4>No prior sustainability expertise required. </h4>
      <h4>Fill in this form and we will do the rest. </h4>
      <br />
      <Link color="white" href="/start">
        <Button colorScheme="teal" size="lg">
          Get started
        </Button>
      </Link>
    </Container>
  );
}
