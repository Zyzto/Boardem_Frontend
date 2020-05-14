import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  split,
  HttpLink,
} from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'
import { Query, Mutation, Subscription } from '@apollo/react-components'
import { graphql } from '@apollo/react-hoc'

// const cache = new InMemoryCache()
// const link = new HttpLink({
// 	uri: 'http://localhost:3004/graphql',
// })

// const client = new ApolloClient({
// 	cache,
// 	link,
// })
// const httpLink = new HttpLink({
//   uri: 'http://localhost:3004/graphql',
//   headers: {
//     authorization: localStorage.getItem('authorization') || '',
//   },
// })

// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:3004/graphql`,
//   options: {
//     reconnect: true,
//   },
// })
// // The split function takes three parameters:
// //
// // * A function that's called for each operation to execute
// // * The Link to use for an operation if the function returns a "truthy" value
// // * The Link to use for an operation if the function returns a "falsy" value
// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     )
//   },
//   wsLink,
//   httpLink,
// )
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3004/graphql',
  headers: {
    authorization: localStorage.getItem('authorization') || '',
  },
//   link: splitLink,
})


// client
// 	.query({
// 		query: gql`
// 			{
// 				users {
// 					email
// 					id
// 					username
// 				}
// 			}
// 		`,
// 	})
// 	.then((result) => console.log(result))
// 	.catch((err) => console.log(err))

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ApolloProvider>,

  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
