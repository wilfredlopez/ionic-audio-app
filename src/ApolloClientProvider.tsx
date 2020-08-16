import React, { PropsWithChildren } from 'react'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { APOLLO_HTTP_URI } from './constants'

import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: APOLLO_HTTP_URI,
    cache: new InMemoryCache()
});


const ApolloClientProvider = (props: PropsWithChildren<{}>) => {
    return <ApolloProvider client={client}>
        {props.children}
    </ApolloProvider>
}


export default ApolloClientProvider