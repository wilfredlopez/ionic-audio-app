import React from "react";
import { render } from "react-dom";

import "./theme/style.css";
import App from "./App";
import ApolloClientProvider from './ApolloClientProvider'
import { AppContextProvider } from "./appState/AppContextProvider";

const AppWrapper = () => {
  return <ApolloClientProvider>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </ApolloClientProvider>
}

render(<AppWrapper />, document.getElementById("root"));
