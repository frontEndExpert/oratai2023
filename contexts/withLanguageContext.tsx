import { LanguagueContextProvider } from "./languagueContext";


export const withLanguageContext = (Component: any) => {
    return (props: any) => {
        return (
            <LanguagueContextProvider>
                <Component {...props} />
            </LanguagueContextProvider>
        )
    }
}
