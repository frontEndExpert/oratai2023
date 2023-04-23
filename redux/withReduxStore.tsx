import React from 'react';
import { ReduxProvider } from "@/redux/reduxProvider";

export const withReduxStore = (Component: any) => {
    return (props: any) => {
        return (
            <ReduxProvider>
                <Component {...props} />
            </ReduxProvider>
        )
    }
}
