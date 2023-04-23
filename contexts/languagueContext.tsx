'use client';

import React, { createContext, useState, Dispatch, SetStateAction } from 'react';

// "en" | "he" | "th"
//changeLanguages
export interface LanguagueContextType {
    currentLanguage: string;
    setCurrentLanguage: Dispatch<SetStateAction<string>>;
}
const LanguagueContext = createContext<LanguagueContextType>({
    currentLanguage: "en",
    setCurrentLanguage: (): string => 'en'
});


export function LanguagueContextProvider({ children: children }: { children: React.ReactNode }) {
    const [currentLanguage, setCurrentLanguage] = useState<string>("en");

    // function changeLanguages (currentLanguage: string) {   setCurrentLanguage(currentLanguage);} 
    return (
        <LanguagueContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
            {children}
        </LanguagueContext.Provider>
    );
}

export default LanguagueContext;

