import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Image } from "react-native";
// import { } from 'expo-router'

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useSearchParams } from "expo-router";
import Field from "../components/Field";

export default function ModalScreen() {
  const params = useSearchParams<{
    url: string;
    description: string;
    author: string;
  }>();

  console.log(params);
  const { url, description, author } = params;
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Modal</Text> */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: url,
          }}
        />
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={{ flex: 1, width: "80%" }}>
        <Field title="Description" text={description} />
        <Field title="Author" text={author} />
      </View>
      {/* <EditScreenInfo path="app/modal.tsx" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
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
  imageContainer: {
    marginTop: 24,
    width: "80%",
    height: "40%",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    borderRadius: 8,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
});
