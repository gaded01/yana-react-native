import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native';
import SafeViewAndroid from "../components/SafeViewAndroid"; 


const GetStarted = () => {
   const navigation = useNavigation();
   
   return (
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
         <View className="bg-yellow-400 flex-1 px-5 py-5 justify-center">
            <View className="flex-row justify-center py-5">
               <Image
                  source={require('../../assets/app-logo.png')}
                  className="h-60 w-60"
               />
            </View>
            <View className="flex-row justify-center">
               <TouchableOpacity
                  className="bg-green-700 rounded-3xl w-48 py-3"
                  onPress={() => {navigation.navigate("Login")}}
               >  
                  <Text className="text-center text-base text-white">Get Started</Text>
               </TouchableOpacity>
            </View>
         </View>
      </SafeAreaView>
   );
}

export default GetStarted;
