'use client'

import { SessionProvider } from "next-auth/react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProvider,
} from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    // dark mode provider for application
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem {...props}>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};

export default Providers;
