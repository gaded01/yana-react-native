import React, { useEffect, useState } from 'react';
import {View, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import { useTestStatusContext } from "../../context/TestStatusContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useElderContext } from "../../context/ElderContext";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const ElderRating = () => {
   const navigation = useNavigation()
   const [loading, setLoading] = useState(false);
   const { elder, setElder } = useElderContext();
   const [rate , setRate] = useState();
   let config = {};

   useEffect(()=>{
      console.log('asdasd', elder)
   }, []);

   const submitRating = async(rate) => {
      setLoading(true);
      let response = await AsyncStorage.getItem('@access_token');
      config = {
         headers: {Authorization: `Bearer ${response}`}
      }
      setTimeout(() => {
         if(elder.status === "done"){
            alert(elder.message)
         }
         else {
            axios.post(`${process.env.REACT_APP_BASE_API_URL}/rate-elder`, {elder_info_id: elder.elder_info.id, rating: rate}, config)
            .then((res)=>{
               alert('Rating successfully submitted');
               navigation.navigate("ElderRatingInfo");
            })
            .catch((err) => {
               console.log(err);
               
            })
         }
         setLoading(false);
      }, 3000)
   };
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
            <Text className="text-lg font-bold">Rate Elder's Life</Text>
         </View>
         <View className="flex items-center px-10 mt-5">
           <Text className="text-lg mb-3">Elder's Life Satisfaction</Text>
            <TouchableOpacity
               className="mt-3"
               onPress={()=> submitRating(1)}
            >
               <Image
                     style={{width:300, height: 50}}
                     source={require("../../../assets/rate_1.png")}
                     
               />
            </TouchableOpacity>
            <TouchableOpacity
               className="mt-3"
               onPress={()=> submitRating(2)}
            >
               <Image
                     style={{width:300, height: 50}}
                     source={require("../../../assets/rate_2.png")}
                     
               />
            </TouchableOpacity>
            <TouchableOpacity
               className="mt-3"
               onPress={()=> submitRating(3)}
            >
               <Image
                     style={{width:300, height: 50}}
                     source={require("../../../assets/rate_3.png")}
                     
               />
            </TouchableOpacity>
            <TouchableOpacity
               className="mt-3"
               onPress={()=> submitRating(4)}
            >
               <Image
                     style={{width:300, height: 50}}
                     source={require("../../../assets/rate_4.png")}
                     
               />
            </TouchableOpacity>
            <TouchableOpacity
               className="mt-3"
               onPress={()=> submitRating(5)}
            >
               <Image
                  style={{width:300, height: 50}}
                  source={require("../../../assets/rate_5.png")}
               />
            </TouchableOpacity>
         </View>
			<Spinner visible={loading} />
		</SafeAreaView>
   );
}


export default ElderRating;
