import React, { useEffect, useState } from 'react';
import {View, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bars3BottomRightIcon, ClockIcon } from "react-native-heroicons/outline";
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
   const [elderHistory, setElderHistory ] = useState([]);
   let config = {};
   
   useEffect(() => {
      setLoading(true);
      const getHistory = async() => {
         let response = await AsyncStorage.getItem('@access_token');
         config = {
            headers: {Authorization: `Bearer ${response}`}
         }
         setTimeout(() => {
            if(elder.status === "done"){
               alert(elder.message)
            }
            else {
               axios.post(`${process.env.REACT_APP_BASE_API_URL}/get-history`, {elder_info_id: elder.elder_info.id}, config)
               .then((res)=>{
                  setElderHistory(res.data)
                  console.log('res.data', res.data) 
               })
               .catch((err) => {
                  console.log(err);
               })
            }
            setLoading(false); 
         }, 3000)
      }
      getHistory();
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
            <Text className="text-lg font-bold">Elder's Test History</Text>
         </View>
         <View className="h-1/2">
            <ScrollView
               vertical
               contentContainerStyle={{
                  paddingBottom: 10,
               }}
               showsHorizontalScrollIndicator={false}
               className="pt-2"
               style={{ flexGrow: 1 }}
            >	
               {
                  elderHistory.length?
                  elderHistory.map((data)=> {
                     return(
                        <View className="mb-10" key={data.id}>
                           <View className="flex items-center px-5">
                              <View className="flex-row items-center w-full mt-2">
                                 <View className="bg-yellow-400 w-12 h-12 justify-center items-center rounded-lg">
                                    <Text className="text-white text-base">
                                       <ClockIcon className="shadow-md " color="#000" />
                                    </Text>
                                 </View>
                                 <View className="w-72 ml-3">
                                    <Text className="text-yellow-600  text-base">
                                    {data.created_at}
                                    </Text>
                                    <View className="flex-row w-72">
                                       <Text className="text-sm text-stone-500 mr-5">
                                          <Text className="font-bold">Score:</Text> {data.total_score}
                                       </Text>
                                       <Text className="text-sm text-stone-500">
                                          <Text className="font-bold">Result:</Text> {data.test_abuse_level.abuse_level }.
                                       </Text>
                                    </View>
                                 </View>
                              </View>
                           </View>
                        </View>
                     )
                  })
                  :
                  <View className="justify-center py-10">
                     <Text className="text-center text-cyan-900 text-base">Elder test history is empty!</Text>
                     <Text className="text-center text-stone-500 text-sm">Take elder test to find out your result</Text>
                  </View>
               }
            </ScrollView>
		   </View>  
			<Spinner visible={loading}/> 
		</SafeAreaView>
   );
}


export default ElderRating;
