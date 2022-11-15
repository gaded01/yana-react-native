import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";

const Soundtrack = () => {
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
      <View className="flex items-center px-10 pb-44 w-full mt-5">
        <ScrollView
          vertical
          contentContainerStyle={{
            paddingVertical: 0,
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          className=""
        >
          <View className="mb-0">
            <YoutubePlayer
              height={170}
              play={playing}
              videoId={"cI4ryatVkKw"}
              onChangeState={onStateChange}
              webViewStyle={{opacity: 0.99}}
              webViewProps={{
               renderToHardwareTextureAndroid: true,
               androidLayerType:
               Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none',
             }}
            />
            <Text className="font-bold mb-10">
               Short Meditation Music - 3 Minute Relaxation, Calming
            </Text>
            <YoutubePlayer
              height={170}
              play={playing}
              videoId={"S6jCd2hSVKA"}
              onChangeState={onStateChange}
              webViewStyle={{opacity: 0.99}}
              webViewProps={{
               renderToHardwareTextureAndroid: true,
               androidLayerType:
               Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none',
             }}
            />
            <Text className="font-bold mb-10">
               Peder B. Helland - Calm Wind
            </Text>
            <YoutubePlayer
              height={170}
              play={playing}
              videoId={"UUl-IlZLsAs"}
              onChangeState={onStateChange}
              webViewStyle={{opacity: 0.99}}
              webViewProps={{
               renderToHardwareTextureAndroid: true,
               androidLayerType:
               Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none',
             }}
            />
            <Text className="font-bold mb-10">
               Namaste Sun
            </Text>
            <YoutubePlayer
              height={170}
              play={playing}
              videoId={"mky5H8wpNwo"}
              onChangeState={onStateChange}
              webViewStyle={{opacity: 0.99}}
              webViewProps={{
               renderToHardwareTextureAndroid: true,
               androidLayerType:
               Platform.OS === 'android' && Platform.Version <= 22 ? 'hardware' : 'none',
             }}
            />
            <Text className="font-bold mb-5">
               Meditate
            </Text>
            <Text className="text-justify text-stone-600">
              As we age, we may worry more about our physical health, but that
              doesn’t mean we can let our mental health go. Mindful meditation
              promotes many physical and psychological benefits. It’s nothing
              new though, people have been meditating. Listening to this music
              will help elder people's state of mind.
              started.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Soundtrack;
