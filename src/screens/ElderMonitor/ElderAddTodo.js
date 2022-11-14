import React, { useEffect, useState } from 'react';
import {View, StyleSheet, SafeAreaView, Image, Text, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Bars3BottomRightIcon, ClockIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import { useElderContext } from "../../context/ElderContext";
import { useMonitorContext } from "../../context/ElderMonitorContext";
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';

const ElderAddTodo = () => {
   const navigation = useNavigation()
   const [loading, setLoading] = useState(false);
   const { elder, setElder } = useElderContext();
   const { monitor, setMonitor} = useMonitorContext();
   const [tempTime, setTempTime] = useState('');
   const [time, setTime] = useState(new Date());
   const [open, setOpen] = useState(false);
   const [todoData, setTodoData] = useState({
      elder_monitor_id: monitor,
      todo: '',
      medicine: '',
      time: '',
   });
   let config = {};

   const selectTime = (event, selectedTime) => { 
      setTodoData(prevState => ({...prevState, time: selectedTime.toLocaleTimeString()}))
      setOpen(() => false);
      setTime(selectedTime);
      var hr = selectedTime.getHours();
      var min = selectedTime.getMinutes();
      if (min < 10) {
          min = "0" + min;
      }
      var ampm = "am";
      if( hr > 12 ) {
          hr -= 12;
          ampm = "pm";
      }
      let time = hr + ":" + min + " " + ampm;
      setTempTime(()=> time);
   };

   
   const handleChange = (name, data) => {
      setTodoData(prevState=> ({...prevState, [name]: data}));
   };

   const submitEntry = async() => {
      console.log('todoData', todoData)
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
            axios.post(`${process.env.REACT_APP_BASE_API_URL}/add-todo`, todoData , config)
            .then((res)=>{
               if(res.data.status == "success"){
                  alert('Successfully submitted');
                  navigation.navigate("ElderTodo");
               }
               else {
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
            <Text className="text-lg font-bold">Elder Todo Medication</Text>
         </View>       
         <ScrollView
            vertical
            contentContainerStyle={{
               paddingVertical: 0,
               flexGrow: 1,
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-2"
         > 
           <View className="px-5">
               <Text className="mt-2 text-base">What to do?</Text>
               <TextInput
                  className="px-4 py-3 text-base rounded-md border mb-1"
                  onChangeText={(data)=>handleChange('todo', data)}
                  placeholder="Enter what to do"
               />
               <Text className="mt-2 text-base">Medicine</Text>
               <TextInput
                  className="px-4 py-3 text-base rounded-md border mb-1"
                  onChangeText={(data)=>handleChange('medicine', data)}
                  placeholder="Enter medicine"
               />
               <Text className="mt-2 text-base">Time</Text>
               <View 
                  className="flex-1 flex-row items-center border rounded-md px-3 mb-1"
               >
                  <TextInput
                     className="px-1 py-3 text-base rounded-md flex-1"
                     value={tempTime}
                     editable={false}
                     placeholder="Click the button to select date"
                  />
                  <ClockIcon 
                  color="gray"
                  onPress={() => setOpen(true)}
                  />

                  {open && (
                     <DateTimePicker
                        value={time} 
                        display="default"
                        mode="time"
                        onChange={selectTime}
                     /> 
                     ) 
                  }
               </View>
               <View className="flex-row justify-center py-5 border-b-2">
                  <TouchableOpacity
                     className="bg-green-700 rounded-3xl w-48 py-3"
                     onPress={submitEntry}
                  >  
                     <Text className="text-center text-base text-white">Insert Medication</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </ScrollView>
			<Spinner visible={loading} />
		</SafeAreaView>
   );
}


export default ElderAddTodo;
