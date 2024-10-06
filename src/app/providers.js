"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children, themeProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
