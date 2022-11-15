import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { REACT_APP_BASE_API_URL } from "@env";
import DonutChart from './DonutChart';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import {Bars3BottomRightIcon, HomeIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useElderContext } from '../../context/ElderContext';


const Result = () => {
   const navigation = useNavigation();
   const [testResult, setTestResult ] = useState('');
   const { elder, setElder } = useElderContext();
   const [loading , setLoading] = useState(false);
   const [email , setEmail] = useState('');
   let config = {};

   
   useEffect(()=> {
      const fetchTestResult = async () => {
         let response = await AsyncStorage.getItem('@access_token');
         config = {
            headers: {Authorization: `Bearer ${response}`}
         }
         await axios.post(`${REACT_APP_BASE_API_URL}/test-result`, {elder_info_id: elder.elder_info.id} , config)
         .then((res) => {
            setTestResult(()=> res.data)
         })
         .catch((error)=> {
            console.log(error)
         })
      }
      fetchTestResult();
   }, []);


   return (
      <View>
         <ScrollView
            vertical
            contentContainerStyle={{
               paddingVertical: 0,
               flexGrow: 1,
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
         >
            <View className="pt-5">
               <View> 
                  <DonutChart score={testResult? testResult.total_score : null}/> 
               </View>
               <Text className="text-center text-lg py-3 ">
                  Out of 42 questions, elderly got {testResult? testResult.total_score: null} points.
               </Text>
               <Text className="text-center text-lg py-3 ">
                  Elderly is <Text className="font-bold"> {testResult? testResult.test_abuse_level.abuse_level: null} </Text> 
               </Text>
               <Text className="text-center text-lg py-3 ">
                  <Text className="font-bold"> Reccomended Activties: </Text> {testResult? testResult.test_abuse_level.advice: null}
               </Text>
               <View className="pt-3 mb-6">
                  <TouchableOpacity
                     className="bg-white mt-4 rounded-lg h-14"
                     onPress={() => navigation.navigate("ResultList")}
                  >
                        <Text className="text-orange-700 text-base text-center px-4 pt-4">
                           View Result
                        </Text>
                  </TouchableOpacity>
               </View>
       
            </View>
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({})

export default Result;
