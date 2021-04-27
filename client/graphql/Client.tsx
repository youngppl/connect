import {
  createHttpLink,
  from,
  ApolloClient,
  split,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  BACKEND_URL,
  HTTP_PROTOCOL,
} from "../constants/Environment";

const cache = new InMemoryCache({});
const httpLink = createHttpLink({
  uri: HTTP_PROTOCOL + BACKEND_URL + "/graphql",
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("ideaHuntToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  httpLink
);

const errorLink = onError((response) => {
  const { graphQLErrors, operation, networkError } = response;
  const { operationName } = operation;
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Operation Name: ${operationName} Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) {
    console.log(`${operationName} [Network error]: ${networkError}`);
    // Remove token and reload page. Need a better fix later
    // AsyncStorage.removeItem("ideaHuntToken");
    // location.reload();
  }
});

export const client = new ApolloClient({
  cache: cache,
  link: from([authLink, errorLink, splitLink]),
});
