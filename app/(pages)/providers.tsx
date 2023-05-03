"use client";

import { PropsWithChildren } from "react";
import store from "../../redux/store";
import { useServerInsertedHTML } from "next/navigation";
import { ReduxProvider } from "@/redux/reduxProvider";
import { LanguagueContextProvider } from "@/contexts/languagueContext";

{/* <Provider store={store}>
  </Provider>; */}

// { children: React.ReactNode }
export function Providers({ children }: PropsWithChildren) {

  // useServerInsertedHTML(() => {
  //   return <>{children}</>;
  // });

  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  )
}