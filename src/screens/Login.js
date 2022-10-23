import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, SafeAreaView, Text, Image, TouchableOpacity, TextInput, Button} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CalendarDaysIcon} from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid"; 
import DatePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Login = () => {
   const navigation = useNavigation()
   const [loading, setLoading] = useState(false);
   const [date, setDate] = useState(new Date());
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [tempDate, setTempDate] = useState('');
   const [open, setOpen] = useState(false)

   const selectDate = (event, birthdate) => { 
      let selectedDate  = birthdate || date;
      setDate(selectedDate);
      
      let tDate = new Date(selectedDate);
      let formattedDate =  monthNames[tDate.getMonth()] +" "+tDate.getDate() + ", "+ tDate.getFullYear() ;
      setTempDate(formattedDate);
      setOpen(false);
   }

   const storeToken = async (value) => {
      const res = await AsyncStorage.setItem("@access_token", value);
      return res;
   };
   
   const submitLogin = () => {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_API_URL}/login`, {email: email, password: password})
      .then((res) => {
         setLoading(false);
         if (res.data.status !== "failed") {
         console.log(res.data.access_token);
         storeToken(res.data.access_token);
         navigation.navigate("HomePanel");
         }
      })
      .catch((error) => {
         console.log('error', error);
         setLoading(false);
      });
    };
  

   return (
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
         <View className="flex-1 bg-yellow-400 px-5 py-5 justify-center">
            <Text className="text-lg font-bold">Have an Account?</Text>
            <View className="flex bg-white rounded-md justify-center mt-2 py-5 px-6">
               <Text className="mt-2 text-base">Email:</Text>
               <TextInput
                  className="px-4 py-3 rounded-md border mb-5"
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Enter name"
               />
               <Text className="mt-2 text-base">Password:</Text>
               <TextInput
                  className="px-4 py-3 rounded-md border mb-5"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={true}
                  placeholder="Enter password"
               />
               {/* <Text className="mt-2 text-base">Birthdate</Text>
               <View 
                  className="flex-1 flex-row items-center border rounded-md px-3 mb-5"
                  onPress={() => setOpen(true)}
               >
                  <TextInput
                     className="px-1 py-3 text-base rounded-md flex-1"
                     value={tempDate}
                     editable={false}
                     placeholder="Select Birthdate"
                     onPress={() => setOpen(true)}
                  />
                  <CalendarDaysIcon 
                  color="gray"
                  onPress={() => setOpen(true)}
                  />
                  {open && 
                     <DatePicker
                        value={date} 
                        display="default"
                        mode="date"
                        onChange={selectDate}
                     /> 
                  }
               </View> */}
               <View className="flex-row justify-center pb-5 border-b-2">
                  <TouchableOpacity
                     className="bg-green-700 rounded-3xl w-48 py-3"
                     onPress={submitLogin}
                  >  
                     <Text 
                        className="text-center text-base text-white"
                     >
                        Login
                     </Text>
                  </TouchableOpacity>
               </View>
               <View className="flex-row justify-center py-5">
               <Text className="text-base text-center">
                  No account?
                     <Text className="text-green-700" onPress={()=>{navigation.navigate("Register")}}>
                        {" "}Click here to register.
                     </Text>
                  </Text>
               </View>
            </View>
         </View>
         <Spinner
            visible={loading}
         />
      </SafeAreaView>
   );
}


export default Login;
