import React from 'react'
import { ActionCreators } from './actionCreators'
import { AppReducer, reducer } from './State'
import { AppContextState } from './state.model'
import { initialState, getInitialState } from './initialState'

export const AppContext = React.createContext<AppContextState>(
  initialState as AppContextState
)

export function AppContextProvider(props: any) {
  const [state, dispatch] = React.useReducer<AppReducer>(
    reducer as any,
    initialState
  )

  React.useEffect(() => {
    async function init() {
      const startingState = await getInitialState(initialState)
      dispatch({
        type: 'SET_INITIAL_STATE',
        state: startingState,
      })
    }
    init()
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch: dispatch,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
export const AppContextConsumer = AppContext.Consumer

export const useAppState = () => {
  const state = React.useContext(AppContext)
  const actions = React.useMemo(() => {
    return ActionCreators
  }, [])
  return [state, state.dispatch, actions] as const
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
