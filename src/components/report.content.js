"use client";
import { SimpleGrid, Box, Container, VStack } from "@chakra-ui/react";
import { Img } from "@chakra-ui/react";
import report from "@/mock/report";
import * as R from "ramda";
import React, { useState, useEffect, useRef } from "react";
import { Spinner } from "@chakra-ui/react";

const { pipe, values, flatten, find, propEq } = R;
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
const findByHeader = (header, data) =>
  data?.find((record) => {
    return record.header == header;
  });

const anyUnsaved = (data) =>
  data?.some((record) => {
    return record.body === "";
  });

export default function ReportContent({ results }) {
  console.log("START content", results);
  const [data, setData] = useState(results);
  useInterval(() => {
    console.log("any?", anyUnsaved(data));
    if (anyUnsaved(data)) {
      fetch("/api/report/sections", { cache: "force-cache" })
        .then((res) => res.json())
        .then((data) => {
          console.log("POLL", data);
          setData(data.response);
        });
    }
  }, 10000);
  const section_1 = findByHeader(report.section_1.header, data);
  const section_2 = findByHeader(report.section_2.header, data);
  const section_3 = findByHeader(report.section_3.header, data);
  const section_4 = findByHeader(report.section_4.header, data);
  const section_5 = findByHeader(report.section_5.header, data);
  const section_6 = findByHeader(report.section_6.header, data);
  const section_7 = findByHeader(report.section_7.header, data);
  const box = {
    padding: 5,
  };
  return (
    <>
      <SimpleGrid columns={4} spacing={10} padding={10}>
        <Box boxSize="sm" height={40} width={40}>
          <Img src="../logo.png" alt="logo" height={40} width={60} />
        </Box>
        <Box boxSize="sm" height={40} width={"100%"}>
          <h1 style={{ fontSize: "2.1em" }}>Veja Shoes</h1>
          <h1 style={{ fontSize: "2.3em", color: "#0097a7" }}>
            Sustainability Report
          </h1>
          <h2 style={{ fontSize: "1.3em" }}>2023</h2>
        </Box>
      </SimpleGrid>

      <SimpleGrid columns={2} spacing={10} padding={10}>
        <VStack spacing={10}>
          <Box bg="#FFAB40" minHeight="80px" padding={box.padding}>
            <Container maxW="container.lg">
              {section_1.body}
              {section_1.body == "" && <Spinner color={"white"} />}
            </Container>
          </Box>

          <Box bg="#FFC973" minHeight="80px" padding={box.padding}>
            <Container maxW="container.lg">
              {section_2.body}
              {section_2.body == "" && <Spinner color={"white"} />}
            </Container>
          </Box>
        </VStack>
        <VStack spacing={10}>
          <Box
            bg="#FFAB40"
            minHeight="80px"
            minWidth="100%"
            padding={box.padding}
          >
            <Container maxW="container.lg">
              {section_3.description}
              <p style={{ textAlign: "center" }}>
                <strong style={{ fontSize: "3em" }}>
                  {report.section_3.body}
                </strong>
              </p>
            </Container>
          </Box>
          <Box
            bg="#FFC973"
            minHeight="80px"
            minWidth="100%"
            padding={box.padding}
          >
            <Container maxW="container.lg">
              {section_4.description}
              <p style={{ textAlign: "center" }}>
                <strong style={{ fontSize: "3em" }}>
                  {report.section_4.body}
                </strong>
              </p>
            </Container>
          </Box>
          <Box
            bg="#FFAB40"
            minHeight="80px"
            minWidth="100%"
            padding={box.padding}
          >
            <Container maxW="container.lg">
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
        <Box bg="#FFAB40" minHeight="80px" padding={box.padding}>
          <Container maxW="container.lg">
            {section_6.body}
            {section_6.body == "" && <Spinner color={"white"} />}
          </Container>
        </Box>
        <Box bg="#FFC973" minHeight="80px" padding={box.padding}>
          <Container maxW="container.lg">
            {section_7.body}
            {section_7.body == "" && <Spinner color={"white"} />}
          </Container>
        </Box>
      </SimpleGrid>
    </>
  );
}
