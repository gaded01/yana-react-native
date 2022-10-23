import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

const HomePanel = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex-1 bg-yellow-400 py-5">
        <View className="flex py-10 px-5">
          <Image
            source={require("../../assets/header-logo.png")}
            className="h-32 w-72"
          />
        </View>
        <View className="flex bg-white p-5">
          <Text className="text-base text-justify text-stone-600">
            Yana Care means "you are not alone" wants elderly people to not feel
            alone. Yana Care is an elderly care application for home care
            specifically personal care.
          </Text>
          <View className="flex-row justify-end mt-10">
            <TouchableOpacity
              className="bg-yellow-500 rounded-3xl w-32 py-2"
              onPress={() => {
                navigation.navigate("Drawer");
              }}
            >
              <Text
                className="text-center text-base text-white"
              >
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default HomePanel;
