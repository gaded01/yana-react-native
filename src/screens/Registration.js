import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, SafeAreaView, Text, Image, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import {CalendarDaysIcon} from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid"; 
import DatePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Registration = () => {
   const navigation = useNavigation()
   const [loading, setLoading] = useState(false);
   const [date, setDate] = useState(new Date());
   const [tempDate, setTempDate] = useState('');
   const [open, setOpen] = useState(false);
   const [registerData, setRegisterData] = useState({
      first_name: '',
      last_name: '',
      middle_name: '',
      address: '',
      email: '',
      password: ''
   });

   // const selectDate = (event, birthdate) => { 
   //    let selectedDate  = birthdate || date;
   //    setDate(selectedDate);
      
   //    let tDate = new Date(selectedDate);
   //    let formattedDate =  monthNames[tDate.getMonth()] +" "+tDate.getDate() + ", "+ tDate.getFullYear() ;
   //    setTempDate(formattedDate);
   //    setOpen(false);
   // };

   const handleChange = (name, data) => {
      setRegisterData(prevState=> ({...prevState, [name]: data}));
   };

   const submitData = () => {
      console.log(registerData)
      setLoading(true);
      axios.post(`${process.env.REACT_APP_BASE_API_URL}/register`, registerData)
      .then((res)=>{
         if(res.data.status == 'created'){
            alert('Registration Success');
            setRegisterData({...registerData, first_name: '',last_name: '', birthdate:date,  address:''});
            navigation.navigate("Login")
         }
         else{
            alert('Invalid input, please try again');
         }
         setLoading(false);
      })
      .catch((err)=> {
         alert('Invalid!');
         setLoading(false);
      })
   };

   return (
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
         <View className="flex-1 bg-yellow-400 px-5 py-5 justify-center">
            <Text className="text-lg font-bold mt-5">Sign up here</Text>   
            <View className="flex bg-white rounded-md justify-center mt-2 mb-5 py-5 px-6">
               <ScrollView
                  vertical
                  contentContainerStyle={{
                     paddingVertical: 0,
                     flexGrow: 1,
                  }}
                  showsHorizontalScrollIndicator={false}
                  className="pt-4"
               > 
                  <Text className="mt-2 text-base">First Name:</Text>
                  <TextInput
                     className="px-4 py-3 text-base rounded-md border mb-1"
                     onChangeText={(data)=>handleChange('first_name', data)}
                     placeholder="Enter first name"
                  />
                  <Text className="mt-2 text-base">Last Name:</Text>
                  <TextInput
                     className="px-4 py-3 text-base rounded-md border mb-1"
                     onChangeText={(data)=>handleChange('last_name', data)}
                     placeholder="Enter last name"
                  />
                  <Text className="mt-2 text-base">Middle Name:</Text>
                  <TextInput
                     className="px-4 py-3 text-base rounded-md border mb-1"
                     onChangeText={(data)=>handleChange('middle_name', data)}
                     placeholder="Enter middle name"
                  />
                  {/* <Text className="mt-2 text-base">Birthdate</Text>
                  <View 
                     className="flex-1 flex-row items-center border rounded-md px-3 mb-1"
                     onPress={() => setOpen(true)}
                  >
                     <TextInput
                        className="px-1 py-3 text-base rounded-md flex-1"
                        value={tempDate}
                        editable={false}
                        placeholder="Click the button to select date"
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
                  <Text className="mt-2 text-base">Address:</Text>
                  <TextInput
                     className="px-4 text-base py-3 rounded-md border mb-1"
                     onChangeText={(data)=>handleChange('address', data)}
                     placeholder="Enter address"
                  />
                  <Text className="mt-2 text-base">Email:</Text>
                  <TextInput
                     className="px-4 text-base py-3 rounded-md border mb-1"
                     onChangeText={(data)=>handleChange('email', data)}
                     placeholder="Enter email"
                  />
                  <Text className="mt-2 text-base">Password:</Text>
                  <TextInput
                     className="px-4 text-base py-3 rounded-md border mb-5"
                     onChangeText={(data)=>handleChange('password', data)}
                     placeholder="Enter password"
                  />
                  <View className="flex-row justify-center pb-5 border-b-2">
                     <TouchableOpacity
                        className="bg-green-700 rounded-3xl w-48 py-3"
                        onPress={submitData}
                     >  
                        <Text className="text-center text-base text-white">Register</Text>
                     </TouchableOpacity>
                  </View>
                  <View className="flex-row justify-center py-5">
                     <Text className="text-base text-center">
                        Already have account?
                        <Text className="text-green-700" onPress={()=>{navigation.navigate("Login")}}>
                           {" "}Click to login.
                        </Text>
                     </Text>
                  </View>
               </ScrollView>
            </View>
         </View>
         <Spinner
            visible={loading}
         />
      </SafeAreaView>
   );
}


export default Registration;
