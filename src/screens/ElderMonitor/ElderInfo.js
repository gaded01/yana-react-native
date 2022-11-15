import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, SafeAreaView, Text, Image, TouchableOpacity, TextInput, Button, ScrollView} from 'react-native';
import {CalendarDaysIcon} from "react-native-heroicons/outline";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import { useElderContext } from "../../context/ElderContext";
import SafeViewAndroid from "../../components/SafeViewAndroid"; 
import DatePicker from '@react-native-community/datetimepicker';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const ElderInfo = () => {
   const navigation = useNavigation()
   const { elder, setElder } = useElderContext();
   const [loading, setLoading] = useState(false);
   const [date, setDate] = useState(new Date());
   const [tempDate, setTempDate] = useState('');
   const [open, setOpen] = useState(false);
   const [registerData, setRegisterData] = useState({
      first_name: '',
      last_name: '',
      birthdate: '',
      address: '',
      type: 'monitor',
   });
   let config = {};

   const selectDate = (event, birthdate) => { 
      setOpen(() => false);
      let selectedDate  = birthdate || date;
      setDate(selectedDate);
      setRegisterData(prevState=> ({...prevState, birthdate: birthdate}));
      let tDate = new Date(selectedDate);
      let formattedDate =  monthNames[tDate.getMonth()] +" "+tDate.getDate() + ", "+ tDate.getFullYear() ;
      setTempDate(formattedDate);
   };

   const handleChange = (name, data) => {
      setRegisterData(prevState=> ({...prevState, [name]: data}));
   };

   const submitData = async() => {
      setLoading(true);
      let response = await AsyncStorage.getItem('@access_token');
      config = {
         headers: {Authorization: `Bearer ${response}`}
      }
      setTimeout(() => {
         axios.post(`${process.env.REACT_APP_BASE_API_URL}/register-elder`, registerData, config)
         .then((res)=>{
            if(res.data.status == "age"){
               alert(res.data.message)
            }
            else {
               setRegisterData({...registerData, first_name: '',last_name: '', birthdate: date,  address: ''});
               setElder(res.data);
               res.data.monitor === "exists"? navigation.navigate("ElderTodo") : navigation.navigate("ElderMonitor");
            }   
         })
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
         <View className="flex-1 bg-yellow-400 px-5 py-5 justify-center">
            <Text className="text-lg font-bold mt-5">Elder's Information</Text>   
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
                     value={registerData.first_name}
                     onChangeText={(data)=>handleChange('first_name', data)}
                     placeholder="Enter first name"
                  />
                  <Text className="mt-2 text-base">Last Name:</Text>
                  <TextInput
                     className="px-4 py-3 text-base rounded-md border mb-1"
                     value={registerData.last_name}
                     onChangeText={(data)=>handleChange('last_name', data)}
                     placeholder="Enter last name"
                  />
                  <Text className="mt-2 text-base">Birthdate</Text>
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
                     {open &&  (
                         <DatePicker
                           value={date} 
                           display="default"
                           mode="date"
                           onChange={selectDate}
                        /> 
                        )
                     }
                  </View>
                  <Text className="mt-2 text-base">Address:</Text>
                  <TextInput
                     className="px-4 text-base py-3 rounded-md border mb-1"
                     value={registerData.address}
                     onChangeText={(data)=>handleChange('address', data)}
                     placeholder="Enter address"
                  />
                  <View className="flex-row justify-center py-5">
                     <TouchableOpacity
                        className="bg-green-700 rounded-3xl w-48 py-3"
                        onPress={submitData}
                     >  
                        <Text className="text-center text-base text-white">Start Rating</Text>
                     </TouchableOpacity>
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

export default ElderInfo;
