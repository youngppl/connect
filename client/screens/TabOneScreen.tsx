import { gql, useQuery, useSubscription } from "@apollo/client";
import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";

const TAB_ONE_SCREEN_QUERY = gql`
  # Write your query or mutation here
  query TabOneScreen {
    allUsers {
      email
      name
    }
  }
`;

const greetings = gql`
  subscription TabOne {
    greetings
  }
`;

export default function TabOneScreen() {
  // const { data, loading } = useQuery(TAB_ONE_SCREEN_QUERY);
  const { data, loading } = useSubscription(greetings);
  console.log(data);
  if (loading || !data) {
    return <ActivityIndicator />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{JSON.stringify(data)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
