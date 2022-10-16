import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {View, SafeAreaView, Text, Image, TouchableOpacity, TextInput, Button} from 'react-native';
import {CalendarDaysIcon} from "react-native-heroicons/outline";
import SafeViewAndroid from "../components/SafeViewAndroid"; 
import DatePicker from '@react-native-community/datetimepicker';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Login = () => {
   const navigation = useNavigation()
   const [date, setDate] = useState(new Date());
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

   return (
      <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
         <View className="flex-1 bg-yellow-400 px-5 py-5 justify-center">
            <Text className="text-lg font-bold">Have an Account?</Text>
            <View className="flex bg-white rounded-md justify-center mt-2 py-5 px-6">
               <Text className="mt-2 text-base">Elder's Name:</Text>
               <TextInput
                  className="px-4 py-3 rounded-md border mb-5"
                  // onChangeText={setEmail}
                  // value={email}
                  placeholder="Enter Name"
               />
               <Text className="mt-2 text-base">Birthdate</Text>
               {/* <View className="flex-row justify-between items-center mb-5">
                  <TextInput
                     className="px-4 py-3 rounded-md border w-3/4"
                     // onChangeText={setEmail}
                     value={tempDate}
                     editable={false}
                     placeholder="Click the button to select date"
                  />
                  <TouchableOpacity 
                     className="bg-yellow-400 rounded-lg h-12 p-3" 
                     onPress={() => setOpen(true)}
                  >
                     <CalendarDaysIcon color="#000"/>
                  </TouchableOpacity>
                  {open && 
                     <DatePicker
                        value={date} 
                        display="default"
                        mode="date"
                        onChange={selectDate}
                     /> 
                  }
                   
               </View> */}
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
                  </View>
               <View className="flex-row justify-center pb-5 border-b-2">
                  <TouchableOpacity
                     className="bg-green-700 rounded-3xl w-48 py-3"
                     onPress={() => {navigation.navigate("Login")}}
                  >  
                     <Text className="text-center text-base text-white">Login</Text>
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
      </SafeAreaView>
   );
}


export default Login;
