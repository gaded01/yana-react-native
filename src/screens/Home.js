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
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex px-2 py-5">
        <View className="flex-row justify-between items-center">
          <Image
            source={require("../../assets/header-logo.png")}
            className="h-20 w-60"
          />
          <Bars3BottomRightIcon color="#000" size="35" onPress={()=>navigation.openDrawer()} />
        </View>
      </View>
      <View className="flex-1 bg-yellow-400 py-5">
         <View className="flex-row justify-evenly mb-5">
            <View className="flex items-center">
               <TouchableOpacity 
                  className="w-28 h-28 bg-white shadow-md flex items-center justify-center rounded-lg"
                  onPress={()=> {navigation.navigate("HealthTips")}}   
               >
                  <Image
                     style={{width: 80, height: 80}}
                     source={require("../../assets/healthcare.png")}
                     
                  />
                  <Text className="text-sm text-stone-500">Healthy Tips</Text>
               </TouchableOpacity>
            </View>
            <View className="flex items-center">
               <TouchableOpacity 
                  className="w-28 h-28 bg-white shadow-md flex items-center justify-center rounded-lg"
                  onPress={()=> {navigation.navigate("HomeTips")}}  
               >
                  <Image
                     style={{width: 80, height: 80}}
                     source={require("../../assets/home.png")}
                  />
                  <Text className="text-sm text-stone-500 ">Home Tips</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View className="flex-row justify-evenly mb-5">
            <View className="flex items-center">
               <TouchableOpacity 
                  className="w-28 h-28 bg-white shadow-md flex items-center justify-center rounded-lg"
                  onPress={()=> {navigation.navigate("Meditation")}}   
               >
                  <Image
                     style={{width: 80, height: 80}}
                     source={require("../../assets/meditation.png")}
                     
                  />
                  <Text className="text-sm text-stone-500">Meditation</Text>
               </TouchableOpacity>
            </View>
            <View className="flex items-center">
               <TouchableOpacity 
                  className="w-28 h-28 bg-white shadow-md flex items-center justify-center rounded-lg"
                  onPress={()=> {navigation.navigate("Exercise")}}  
               >
                  <Image
                     style={{width: 80, height: 80}}
                     source={require("../../assets/exercise.png")}
                  />
                  <Text className="text-sm text-stone-500 ">Exercise</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View className="flex-row justify-evenly mb-5">
            <View className="flex items-center">
               <TouchableOpacity 
                  className="w-28 h-28 bg-white shadow-md flex items-center justify-center rounded-lg"
                  onPress={()=> {navigation.navigate("ElderInfo")}}   
               >
                  <Image
                     style={{width: 80, height: 80}}
                     source={require("../../assets/ribbon.png")}
                     
                  />
                  <Text className="text-sm text-stone-500">Elder Abuse Test</Text>
               </TouchableOpacity>
            </View>
            <View className="flex items-center">
               <TouchableOpacity 
                  className="w-28 h-28 bg-white shadow-md flex items-center justify-center rounded-lg"
                  onPress={()=> {navigation.navigate("ElderRatingInfo")}}  
               >
                  <Image
                     style={{width: 80, height: 80}}
                     source={require("../../assets/rating.png")}
                  />
                  <Text className="text-sm text-stone-500 ">Rate Elder's Life</Text>
               </TouchableOpacity>
            </View>
         </View>
      </View>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default Home;
