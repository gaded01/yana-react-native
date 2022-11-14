import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PencilSquareIcon,
  Bars3BottomRightIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import { useTestStatusContext } from "../../context/TestStatusContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useElderContext } from "../../context/ElderContext";
import { useMonitorContext } from "../../context/ElderMonitorContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native'

const ElderTodo = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { elder, setElder } = useElderContext();
  const { monitor, setMonitor } = useMonitorContext();
  const [monitorResult, setMonitorResult] = useState("");
  const [todo, setTodo] = useState('');
  const isFocused = useIsFocused()
  let config = {};

  useEffect(() => {
    const fetchTestResult = async () => {
      let response = await AsyncStorage.getItem("@access_token");
      config = {
        headers: { Authorization: `Bearer ${response}` }, 
      };
      await axios
        .post(
          `${process.env.REACT_APP_BASE_API_URL}/get-todo`,
          { elder_info_id: elder.elder_info.id },
          config
        )
        .then((res) => {
          setMonitorResult(() => res.data); 
          setMonitor(res.data.id);
          setTodo(res.data.elder_todo);
          
          console.log("res.data", res.data); 
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchTestResult();
  }, [isFocused]);

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
        <Text className="text-lg font-bold">Elder Monitoring</Text>
      </View>
      <ScrollView
        vertical
        contentContainerStyle={{
          paddingVertical: 0,
          flexGrow: 1,
          paddingBottom: 50,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-2"
      >
        <View className="px-5">
          {monitorResult ? (
            <View>
              <View className="flex-row justify-between items-center border-b-2 border-stone-400 py-3 mb-3">
                <Text className="font-bold text-lg">Elder's Data</Text>
              </View>
              <Text className="font-bold text-base">
                Elder's name:{" "}
                <Text className="font-normal">
                  {monitorResult.elder_info.first_name +
                    " " +
                    monitorResult.elder_info.last_name}
                </Text>
              </Text>
              <Text className="font-bold text-base">
                Sugar level:{" "}
                <Text className="font-normal">{monitorResult.sugar_level}</Text>
              </Text>
              <Text className="font-bold text-base">
                Blood pressure:{" "}
                <Text className="font-normal">
                  {monitorResult.blood_pressure}
                </Text>
              </Text>
              <Text className="font-bold text-base">
                Height:{" "}
                <Text className="font-normal">{monitorResult.height}cm</Text>
              </Text>
              <Text className="font-bold text-base">
                Weight:{" "}
                <Text className="font-normal">{monitorResult.weight}kg</Text>
              </Text>
            </View>
          ) : null}

          <View>
            <View className="flex-row justify-between items-center border-b-2 border-stone-400 py-3 mb-3">
              <Text className="font-bold text-lg">Medication</Text>
              <TouchableOpacity
                className="w-10 h-10 shadow-sm flex items-center justify-center rounded-3xl self-center bg-yellow-400"
                onPress={() => {
                  navigation.navigate("ElderAddTodo");
                }}
              >
                <PlusIcon className="shadow-md " color="#000" size="25" />
              </TouchableOpacity>
            </View>
            { todo.length? 
               todo.map((data) => { 
                  return (
                  <View className="flex-row items-center w-full mt-2" key={data.id}>
                    <View className="bg-yellow-400 w-10 h-10 justify-center items-center rounded-lg">
                      <Text className="text-white text-base"></Text>
                    </View>
                    <View className="w-72 ml-3">
                      <Text className="text-yellow-700 text-base">{data.todo}</Text>
                      <View className="flex-row w-72">
                        <Text className="text-sm text-stone-500 mr-5">
                          <Text className="font-bold">Medicine:</Text> {data.medicine}
                        </Text>
                        <Text className="text-sm text-stone-500">
                          <Text className="font-bold">Time:</Text> {data.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                  )
                })
               :
               null
              }
          </View>
        </View>
      </ScrollView>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default ElderTodo;
