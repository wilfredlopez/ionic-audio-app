import React from 'react'
import {
    AppContextState, AppReducer, reducer,
    // Actions
    ActionCreators,
} from './State';
import { initialState } from './initialState'

export const AppContext = React.createContext<AppContextState>(
    {} as AppContextState,
);


export function AppContextProvider(props: any) {
    const fullInitialState: AppContextState = {
        ...initialState,
    };

    let [state, dispatch] = React.useReducer<AppReducer>(
        reducer as any,
        fullInitialState as any,
    );

    return (
        <AppContext.Provider
            value={{
                ...state,
                dispatch: dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
export const AppContextConsumer = AppContext.Consumer;


export const useAppState = () => {
    const state = React.useContext(AppContext)
    return [state, state.dispatch, ActionCreators] as const
}



// const logger = (red: typeof reducer) => {
//     const reducerWithLogger = (state: AppContextState, action: Actions) => {
//         console.log(
//             "%cPrevious State:",
//             "color: #9E9E9E; font-weight: 700;",
//             state,
//         );
//         console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
//         console.log(
//             "%cNext State:",
//             "color: #47B04B; font-weight: 700;",
//             red(state, action),
//         );
//         return red(state, action);
//     };

//     return reducerWithLogger;
// };

// const loggerReducer = logger(reducer);