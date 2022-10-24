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

const Meditation = () => {
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
          <Bars3BottomRightIcon
            color="#000"
            size="35"
            onPress={() => navigation.openDrawer()}
          />
        </View>
      </View>
      <View className="flex bg-yellow-400 py-3 px-5">
        <Text className="text-lg font-bold">Meditation</Text>
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
              videoId={"s6rXVM8VIWc"}
              onChangeState={onStateChange}
            />
            <Text className="font-bold">
              Benefits of mindful meditation for older adults—and how to get
              started
            </Text>
            <Text className="text-justify text-stone-600">
              As we age, we may worry more about our physical health, but that
              doesn’t mean we can let our mental health go. Mindful meditation
              promotes many physical and psychological benefits. It’s nothing
              new though, people have been meditating since 5000 BC. Read on to
              learn about mindful meditation, its benefits, and how to get
              started.
            </Text>
          </View>
          <View>
            <Text className="font-bold">What is mindful meditation?</Text>
            <Text className="text-justify text-stone-600">
					Meditation is all about cultivating presence, awareness, and
					non-judgment. The mental training practice offers a different way
					of dealing with stress, by calming the mind and body. You just sit
					still or lie down, relax, and don’t dwell on the thoughts that
					drift through your head. When you meditate your breath slows down,
					heart rate slows, blood pressure decreases, stress decreases, and
					tension in the body decreases. Mindfulness is simply observing and
					accepting thoughts as they occur without judgment. Instead of
					worrying about the future or ruminating on the past, mindfulness
					meditation focuses on the present, blocking out modern-day
					distractions.
            </Text>
          </View>
          <View>
            <Text className="text-justify text-stone-600">
              Keep in mind, some physical activity is better than none at all.
              Your health benefits will also increase with the more physical
              activity that you do.
            </Text>
            <Text className="text-justify font-bold mb-2">
              Adults aged 65 and older need:
            </Text>
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
            <Text className="text-justify font-bold mb-2">
              Move More and Sit Less
            </Text>
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

export default Meditation;
