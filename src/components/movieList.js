import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import {
  image185,
  fallbackMoviePoster,
  fallbackPersonImage,
} from "../api/moviedb";
let { width, height } = Dimensions.get("window");
const MovieList = ({ data, title, hideSeeAll = false }) => {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg" style={styles.text}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}>
              <View className="space-y-2  mr-4 flex items-center">
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                  }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-100 text-xl">
                  {item.title?.length > 12
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
