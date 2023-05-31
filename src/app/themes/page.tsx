"use client";
import { SimpleGrid, Box, Container, VStack } from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";
import report from "@/mock/report";

export default function Page() {
  const { meta } = report;
  const box = {
    padding: 5,
  };
  return (
    <>
      <SimpleGrid columns={6} spacing={10} padding={10}>
        <Box boxSize="sm" height={40} width={60}>
          <Img src="./logo.jpg" alt="Dan Abramov" height={40} width={60} />
        </Box>
        <Box boxSize="sm" height={40} width={"100%"}>
          <h1 style={{ fontSize: "2em" }}>Sustainability Report</h1>
          <h2>{meta.year}</h2>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={10} padding={10}>
        <VStack spacing={10}>
          <Box bg="seashell" minHeight="80px" padding={box.padding}>
            <Container maxW="container.lg">
              <strong>{report.section_1.header}</strong>:{" "}
              {report.section_1.body}
            </Container>
          </Box>
          <Box bg="#F4E9E6" minHeight="80px" padding={box.padding}>
            <Container maxW="container.lg">
              <strong>{report.section_2.header}</strong>:{" "}
              {report.section_2.body}
            </Container>
          </Box>
        </VStack>
        <VStack spacing={10}>
          <Box
            bg="#6FB7BF"
            minHeight="80px"
            minWidth="100%"
            padding={box.padding}
          >
            <Container maxW="container.lg">
              <strong>{report.section_3.header}</strong>:{" "}
              {report.section_3.description}
              <p style={{ textAlign: "center" }}>
                <strong style={{ fontSize: "3em" }}>
                  {report.section_3.body}
                </strong>
              </p>
            </Container>
          </Box>
          <Box
            bg="#9AD2D8"
            minHeight="80px"
            minWidth="100%"
            padding={box.padding}
          >
            <Container maxW="container.lg">
              <strong>{report.section_4.header}</strong>:{" "}
              {report.section_4.description}
              <p style={{ textAlign: "center" }}>
                <strong style={{ fontSize: "3em" }}>
                  {report.section_4.body}
                </strong>
              </p>
            </Container>
          </Box>
          <Box
            bg="#6FB7BF"
            minHeight="80px"
            minWidth="100%"
            padding={box.padding}
          >
            <Container maxW="container.lg">
              <strong>{report.section_5.header}</strong>:{" "}
              {report.section_5.description}
              <p style={{ textAlign: "center" }}>
                <strong style={{ fontSize: "3em" }}>
                  {report.section_5.body}
                </strong>
              </p>
            </Container>
          </Box>
        </VStack>
      </SimpleGrid>
      <SimpleGrid spacing={10} padding={10}>
        <Box bg="#FFF5EE" minHeight="80px" padding={box.padding}>
          <Container maxW="container.lg">
            <strong>{report.section_6.header}</strong>: {report.section_6.body}
          </Container>
        </Box>
        <Box bg="seashell" minHeight="80px" padding={box.padding}>
          <Container maxW="container.lg">
            <strong>{report.section_7.header}</strong>: {report.section_7.body}
          </Container>
        </Box>
      </SimpleGrid>
    </>
  );
}
