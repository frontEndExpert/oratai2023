import { LanguagueContextProvider } from "./languagueContext";
import type { LanguagueContextType } from "./languagueContext";


export const withLanguageContext = (Component: any) => {
    return (props: any) => {
        return (
            <LanguagueContextProvider>
                <Component {...props} />
            </LanguagueContextProvider>
        )
    }
}