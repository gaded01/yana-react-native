import React, { useEffect, useState } from "react";
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

const Meditation = () => {
  const navigation = useNavigation();
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
          
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Meditation;
