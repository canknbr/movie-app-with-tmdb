import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovie from "../components/trendingMovie";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
} from "../api/moviedb";
const strColored = (str) => {
  return [...str].map((item, index) => {
    return (
      <Text
        key={index}
        style={{
          color: index % 2 === 0 ? styles.text.color : "white",
        }}>
        {item}
      </Text>
    );
  });
};
const HomeScreen = () => {
  const isIos = Platform.OS === "ios";
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTrendingMovie();
    getUpcomingMovie();
    getTopRatedMovie();
  }, []);
  const getTrendingMovie = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  };
  const getUpcomingMovie = async () => {
    const data = await fetchUpcomingMovies();
    if (data && data.results) {
      setUpcoming(data.results);
    }
    setLoading(false);
  };
  const getTopRatedMovie = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) {
      setTopRated(data.results);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-black/90">
      <SafeAreaView className={isIos ? "-mb-2" : "mb-3"}>
        <View className="flex-row items-center justify-between mx-4">
          <Bars3CenterLeftIcon
            size={"30"}
            strokeWidth={2}
            color={styles.text.color}
          />
          <Text className="text-white font-bold text-3xl">
            {strColored("Movies")}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon
              size={"30"}
              strokeWidth={2}
              color={styles.text.color}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}>
          {trending.length > 0 && <TrendingMovie data={trending} />}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
