"use client";

import { Img } from "@chakra-ui/image";
import { Box, Container, SimpleGrid, VStack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// realtime subscriptions need to be set up client-side
// this component takes initial sections as props and automatically
// updates when new sections are updated in Supabase's `sections` table
export default function RealtimeSections({ serverSections }: { serverSections: any }) {
  const [sections, setSections] = useState(serverSections);

  useEffect(() => {
    // this overwrites `sections` any time the `serverSections` prop changes
    // this happens when the parent Server Component is re-rendered
    setSections(serverSections);
  }, [serverSections]);

  useEffect(() => {
    // ensure you have enabled replication on the `sections` table
    // https://app.supabase.com/project/_/database/replication
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "sections" },
        (payload) => setSections((sections: any) => {
            const otherSections = sections.filter((section: any) => section.id !== payload.new.id);
            if(!payload.new.body) {
                return otherSections;
            } else {
                return [...otherSections, payload.new];
            }
        })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverSections]);

  const findById = (id:number) => sections.find((section: { id: number; }) => section.id === id) || {};


  const sec1 = findById(1);
  const sec2 = findById(2);
  const sec3 = findById(3);
  const sec4 = findById(4);
  const sec5 = findById(5);
  const sec6 = findById(6);
  const sec7 = findById(7);
  const tempValues = {
    scope1: "12.8 tCO2e",
    scope2: "3.5 tCO2e",
    scope3: "69,765.4 tCO2e"
  }
    const box = {
        padding: 5
    }
    return (
        <>
            <SimpleGrid columns={4} spacing={10} padding={10}>
                <Box boxSize='sm' height={40} width={40}>
                    <Img src='../logo.png' alt='logo' height={40} width={60} />
                </Box>
                <Box boxSize='sm' height={40} width={"100%"}>
                    <h1 style={{fontSize:"2.1em"}}>Veja Shoes</h1>
                    <h1 style={{fontSize:"2.3em", color:"#0097a7"}}>Sustainability Report</h1>
                    <h2 style={{fontSize:"1.3em"}}>2023</h2>
                </Box>
            </SimpleGrid>

            <SimpleGrid columns={2} spacing={10} padding={10}>
                <VStack spacing={10}>
                    <Box bg='#FFAB40' minHeight='80px' padding={box.padding}>
                        <Container maxW='container.lg'>
                            {sec1.body}
                            {sec1.body == "" && <Spinner color={"white"} />}
                        </Container>
                    </Box>

                    <Box bg='#FFC973' minHeight='80px' padding={box.padding}>
                        <Container maxW='container.lg'>
                           {sec2.body}
                            {sec2.body == "" && <Spinner color={"white"} />}
                        </Container>
                    </Box>
                </VStack>
                <VStack spacing={10}>
                    <Box bg='#FFAB40' minHeight='80px' minWidth='100%' padding={box.padding}>
                        <Container maxW='container.lg' >
                            {sec3.description}
                            <p style={{textAlign:"center"}}><strong style={{fontSize:"3em"}}>{tempValues.scope1}</strong></p>
                        </Container>
                    </Box>
                    <Box bg='#FFC973' minHeight='80px' minWidth='100%' padding={box.padding}>
                        <Container maxW='container.lg'>
                            {sec4.description}
                            <p style={{textAlign:"center"}}><strong style={{fontSize:"3em"}}>{tempValues.scope2}</strong></p>
                        </Container>
                    </Box>
                    <Box bg='#FFAB40' minHeight='80px' minWidth='100%' padding={box.padding}>
                        <Container maxW='container.lg'>
                            {sec5.description}
                            <p style={{textAlign:"center"}}><strong style={{fontSize:"3em"}}>{tempValues.scope3}</strong></p>
                        </Container>
                    </Box>
                </VStack>
            </SimpleGrid>
            <SimpleGrid spacing={10} padding={10}>
                <Box bg='#FFAB40' minHeight='80px' padding={box.padding}>
                    <Container maxW='container.lg'>
                        {sec6.body}
                        {sec6.body == "" && <Spinner color={"white"} />}
                    </Container>
                </Box>
                <Box bg='#FFC973' minHeight='80px' padding={box.padding}>
                    <Container maxW='container.lg'>
                        {sec7.body}
                        {sec7.body == "" && <Spinner color={"white"} />}
                    </Container>
                </Box>
            </SimpleGrid>
        </>
    );
}

