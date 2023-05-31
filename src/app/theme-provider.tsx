"use client";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/900.css";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/components/themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
