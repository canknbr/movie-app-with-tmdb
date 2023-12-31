import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { fallbackPersonImage, image185 } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}>
        {cast &&
          cast.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Person", item)}
                key={index}
                className="mr-4 items-center">
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    className="rounded-2xl h-24 w-20"
                    source={{
                      uri: image185(item?.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>

                <Text className="text-white text-xs mt-1">
                  {item?.character?.length > 10
                    ? item?.character.slice(0, 10)
                    : item.character}
                </Text>
                <Text className="text-neutral-400 text-xs mt-1">
                  {item?.original_name?.length > 10
                    ? item?.original_name.slice(0, 10)
                    : item.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
