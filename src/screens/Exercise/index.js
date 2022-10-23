import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";

const Healthtips = () => {
  const navigation = useNavigation();
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
   if (state === "ended") {
     setPlaying(false);
     Alert.alert("video has finished playing!");
   }
 }, []);
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex px-2 py-5">
        <View className="flex-row justify-between items-center">
          <Image
            source={require("../../../assets/header-logo.png")}
            className="h-20 w-60"
          />
          <Bars3BottomRightIcon color="#000" size="35" onPress={()=>navigation.openDrawer()}/>
        </View>
      </View>
      <View className="flex bg-yellow-400 py-3 px-5">
        <Text className="text-lg font-bold">Exercise</Text>
      </View>
      <View className="flex items-center px-10 pb-44 mt-5">
        <ScrollView
          vertical
          contentContainerStyle={{
            paddingVertical: 0,
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          className=""
        >
          <View className="mb-2">
            <YoutubePlayer
               height={200}
               play={playing}
               videoId={"bO6NNfX_1ns"}
               onChangeState={onStateChange}
            />
            <Text className="text-justify text-stone-600">
              As an older adult, regular physical activity is one of the most
              important things you can do for your health. It can prevent or
              delay many of the health problems that seem to come with age. It
              also helps your muscles grow stronger so you can keep doing your
              day-to-day activities without becoming dependent on others.
            </Text>
          </View>
          <View>
            <Text className="text-justify text-stone-600">
              Keep in mind, some physical activity is better than none at all.
              Your health benefits will also increase with the more physical
              activity that you do.
            </Text>
          </View>
          <View>
            <Text className="text-justify text-stone-600">
              Keep in mind, some physical activity is better than none at all.
              Your health benefits will also increase with the more physical
              activity that you do.
            </Text>
            <Text className="text-justify font-bold mb-2">Adults aged 65 and older need:</Text>
            <Text className="text-justify text-stone-600 mb-2">
              1. At least 150 minutes a week (for example, 30 minutes a day, 5
              days a week) of moderate intensity activity such as brisk walking.
              Or they need 75 minutes a week of vigorous-intensity activity such
              as hiking, jogging, or running.
            </Text>
            <Text className="text-justify text-stone-600 mb-2">
              2. At least 2 days a week of activities that strengthen muscles
            </Text>
            <Text className="text-justify text-stone-600 mb-2">
              3. Activities to improve balance such as standing on one foot
              about 3 days a week.
            </Text>
            <Text className="text-justify text-stone-600 mb-2">
              If chronic conditions affect your ability to meet these
              recommendations, be as physically active as your abilities and
              conditions allow.
            </Text>
          </View>
          <View>
            <Text className="text-justify font-bold mb-2">
              Making Physical Activity a Part of an Older Adult’s Life
            </Text>
            <Text className="text-justify text-stone-600 mb-2">
              Don’t worry if you’re thinking, “How can I meet the recommended
              physical activity levels each week?” You’ll be surprised by the
              variety of activities you have to choose from.
            </Text>
          </View>
          <View>
            <Text className="text-justify font-bold mb-2">Move More and Sit Less</Text>
            <Text className="text-justify text-stone-600 mb-2">
              Older adults should move more and sit less throughout the day.
              Keep in mind, some physical activity is better than none. Older
              adults who sit less and do any amount of moderate-to-vigorous
              intensity physical activity gain some health benefits. Your health
              benefits will also increase with the more physical activity that
              you do.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Healthtips;
