import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fallbackMoviePoster, image185, searchMovies } from "../api/moviedb";
let { width, height } = Dimensions.get("window");
const SearchScreen = () => {
  const [results, setResults] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleSearch = (text) => {
    if (text && text.length > 2) {
      setLoading(true);
      searchMovies({
        query: text,
        page: 1,
        include_adult: false,
        language: "en-US",
      }).then((data) => {
        setLoading(false);
        setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const handleDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="flex-1 bg-black/90">
      <View className="flex-row justify-between items-center mx-4 mb-3 border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleDebounce}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500">
          <XMarkIcon size={"25"} color={"white"} />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 15,
          }}
          className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push("Movie", item)}>
                  <View className="mb-4 space-y-2">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: image185(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                    />
                    <Text className="text-neutral-400 ml-1">{item?.title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
