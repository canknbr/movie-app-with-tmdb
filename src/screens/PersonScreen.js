import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { styles } from "../theme";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";
let { width, height } = Dimensions.get("window");
const isIos = Platform.OS === "ios";
const verticalMargin = isIos ? "" : "my-3";
const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorites, setFavorites] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getPersonalDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);
  const getPersonalDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) {
      setPerson(data);
    }
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };
  return (
    <ScrollView
      className="flex-1 bg-black/90"
      contentContainerStyle={{
        paddingBottom: 20,
      }}>
      <SafeAreaView
        className={`z-10 w-full flex-row justify-between items-center px-4 ${verticalMargin}`}>
        <TouchableOpacity
          style={styles.background}
          className="rounded-full p-2"
          onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={"28"} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full p-2"
          onPress={() => setFavorites((prev) => !prev)}>
          <HeartIcon size={"28"} color={isFavorites ? "#7D1128" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowOpacity: 0.7,
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
            }}>
            <View className="h-72 w-72 rounded-full overflow-hidden border-2 border-neutral-300">
              <Image
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{
                  width: width * 0.74,
                  height: height * 0.43,
                }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-center text-3xl text-white font-bold">
              {person?.name}
            </Text>
            <Text className="text-center text-neutral-500 text-base">
              {person?.place_of_birth}
            </Text>
          </View>
          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-3 items-center ">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-3 items-center ">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-3 items-center ">
              <Text className="text-white font-semibold">Known For</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.known_for_department}
              </Text>
            </View>
            <View className=" px-3 items-center ">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity?.toFixed(2)}
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.biography || "N/A"}
            </Text>
          </View>
          <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;
