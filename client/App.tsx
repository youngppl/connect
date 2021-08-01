import {ApolloProvider} from "@apollo/client/react";
import {useFonts, Quicksand_700Bold} from "@expo-google-fonts/quicksand";
import AppLoading from "expo-app-loading";
import {StatusBar} from "expo-status-bar";
import React from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {client} from "./graphql/Client";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import UserProvider from "./providers/UserProvider";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Quicksand: Quicksand_700Bold,
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ApolloProvider client={client}>
        <UserProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </UserProvider>
      </ApolloProvider>
    );
  }
}
