import React, { useEffect, useState } from 'react';
import {View, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import { useTestStatusContext } from "../../context/TestStatusContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useElderContext } from "../../context/ElderContext";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const ElderMonitor = () => {
   const navigation = useNavigation()
   const [loading, setLoading] = useState(false);
   const { elder, setElder } = useElderContext();
   const [rate , setRate] = useState();
   const [monitorData, setMonitorData] = useState({
      elder_info_id: elder.elder_info.id,
      sugar_level: '',
      blood_pressure: '',
      weight: '',
      height: '',
   });
   let config = {};
   
 
   const handleChange = (name, data) => {
      setMonitorData(prevState=> ({...prevState, [name]: data}));
   };

   const submitEntry = async(rate) => {
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
            axios.post(`${process.env.REACT_APP_BASE_API_URL}/add-monitor`, monitorData, config)
            .then((res)=>{
               if(res.data.status == "success"){
                  lert('Successfully submitted');
                  navigation.navigate("ElderTodo");
               }
               else{
                  alert('Unable to add, please try again.');
               }
           
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
            <Text className="text-lg font-bold">Enter Elder Health Data</Text>
         </View>       
         <ScrollView
            vertical
            contentContainerStyle={{
               paddingVertical: 0,
               flexGrow: 1,
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
         > 
            <View className="px-10">
               <Text className="mt-2 text-base">What is the elder's sugar level?</Text>
               <TextInput
                  className="px-4 py-3 text-base rounded-md border mb-1"
                  onChangeText={(data)=>handleChange('sugar_level', data)}
                  placeholder="Enter sugar level"
               />
               <Text className="mt-2 text-base">What is the elder's blood pressure?</Text>
               <TextInput
                  className="px-4 py-3 text-base rounded-md border mb-1"
                  onChangeText={(data)=>handleChange('blood_pressure', data)}
                  placeholder="Enter blood pressure"
               />
               <Text className="mt-2 text-base">What is the elder's weight(kg)?</Text>
               <TextInput
                  className="px-4 py-3 text-base rounded-md border mb-1"
                  onChangeText={(data)=>handleChange('weight', data)}
                  placeholder="Enter weight"
               />
               <Text className="mt-2 text-base">What is the elder's height(cm)?</Text>
               <TextInput
                  className="px-4 py-3 text-base rounded-md border mb-1"
                  onChangeText={(data)=>handleChange('height', data)}
                  placeholder="Enter height"
               />
               <View className="flex-row justify-center py-5 border-b-2">
                  <TouchableOpacity
                     className="bg-green-700 rounded-3xl w-48 py-3"
                     onPress={submitEntry}
                  >  
                     <Text className="text-center text-base text-white">Register</Text>
                  </TouchableOpacity>
               </View>
            </View>
           
         </ScrollView>
    
			<Spinner visible={loading} />
		</SafeAreaView>
   );
}


export default ElderMonitor;
