import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";
import { Line } from "react-native-svg";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieDetails,
  fetchMovieCredits,
  image500,
  fetchSimilarMovies,
} from "../api/moviedb";
const { width, height } = Dimensions.get("window");
let isIos = Platform.OS === "ios";
const topMargin = isIos ? "" : "mt-3";
const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, , 3, 4]);
  const [similarData, setSimilarData] = useState([1, 2, 3, 4]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarData(data.results);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-black/90">
      <View className="w-full">
        <SafeAreaView
          className={`absolute w-full z-10 flex-row items-center justify-between mx-2 px-4 ${topMargin}`}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-xl p-1"
            style={styles.background}>
            <ChevronLeftIcon size={"28"} color={"white"} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavorite((prev) => !prev)}
            className="p-4">
            <HeartIcon
              size={"35"}
              color={isFavorite ? "#7D1128" : "white"}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{
                width,
                height: height * 0.55,
              }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,.6)", "rgba(23,23,23,1)"]}
              style={{
                width,
                height: height * 0.55,
              }}
              start={{ x: 0.5, y: 0 }}
              end={{
                x: 0.5,
                y: 1,
              }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>
      <View
        style={{
          marginTop: -(height * 0.09),
        }}
        className="space-y-3">
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {movie?.id ? (
          <Text className="text-neutral-400 text-center text-base font-semibold">
            {movie?.status} · {movie?.release_date.split("-")[0]} ·{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 !== movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 text-center text-base font-semibold">
                {genre?.name} {showDot && "·"}
              </Text>
            );
          })}
        </View>
        <Text className="tracking-wide text-neutral-400 mx-4">
          {movie?.overview}
        </Text>
      </View>
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
      {similarData.length > 0 && (
        <MovieList
          hideSeeAll={true}
          title="Similar Movies"
          data={similarData}
        />
      )}
    </ScrollView>
  );
};

export default MovieScreen;
