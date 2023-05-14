"use client";

import { PropsWithChildren } from "react";
import { ReduxProvider } from "@/redux/reduxProvider";
import { LanguagueContextProvider } from "@/contexts/languagueContext";


export function Providers({ children }: PropsWithChildren) {

  return (
    <ReduxProvider>
      <LanguagueContextProvider>
        {children}
      </LanguagueContextProvider>
    </ReduxProvider>
  )
}