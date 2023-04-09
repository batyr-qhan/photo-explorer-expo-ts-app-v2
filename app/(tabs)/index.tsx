import {
  Alert,
  Button,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useState, useEffect } from "react";
import PhotoComp from "../../components/PhotoComp";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { API_KEY } from "@env";

import { createApi } from "unsplash-js";
import { FontAwesome } from "@expo/vector-icons";

const serverApi = createApi({
  accessKey: API_KEY,
});

export default function TabOneScreen() {
  const [data, setPhotosResponse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getRandomPhotos();
  }, []);

  const getRandomPhotos = () => {
    serverApi.photos
      .list({})
      .then((result) => {
        setPhotosResponse(result);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  };

  const onSearch = () => {
    serverApi.search
      .getPhotos({
        query: searchQuery.trim(),
        page: 1,
        perPage: 10,
        color: "green",
        orientation: "portrait",
      })
      .then((result) => {
        console.log(result);
        if (!(result.response?.total === 0)) {
          setPhotosResponse(result);
        } else {
          Alert.alert("Error", "Nothing Found");
        }
        setSearchQuery("");
      });
    Keyboard.dismiss();
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.container}
    >
      <FlatList
        style={{ width: "100%" }}
        keyExtractor={(result) => result.id}
        data={data?.response?.results}
        numColumns={2}
        // columnWrapperStyle={{ }}
        renderItem={({ item }) => (
          <PhotoComp
            id={item.id}
            urls={item.urls}
            user={item.user}
            description={item.alt_description}
          />
        )}
      />
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <TextInput
          placeholder="Try To Search"
          style={styles.searchField}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable onPress={onSearch} style={styles.btn}>
          <FontAwesome name="search" color="white" size={18} />
          {/* <Text>Search</Text> */}
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    paddingVertical: 16,
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
  searchField: {
    flex: 1,
    height: 50,
    width: 100,
    borderWidth: 1,
    borderColor: "rgba(256,256,256, .5)",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 16,
    marginRight: 16,
    fontSize: 18,
  },
  btn: {
    borderWidth: 1,
    borderColor: "rgba(256,256,256, .5)",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
