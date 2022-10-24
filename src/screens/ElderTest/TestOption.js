import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RadioGroup, { RadioButton } from 'react-native-radio-buttons-group';
import { useTestStatusContext } from '../../context/TestStatusContext';

const TestOption = ({setOptionSelect, optionSelect}) => {
   const { testStatus } = useTestStatusContext();
   const [ elderAnswer, setElderAnswer ]= useState();
   const [testOption, setTestOption] = useState([]);
   let config = {};

   useEffect(()=> {
      const fetchOption = async () => {
         const resToken = await AsyncStorage.getItem('@access_token');  
         config = {
            headers: {Authorization: `Bearer ${resToken}`}
         } 
         await axios.get(`${process.env.REACT_APP_BASE_API_URL}/get-test-option`, config)
         .then((res)=> {
            setTestOption(() => res.data); 
         })
      }
      fetchOption();
   },[]);

  
   return (
      <View className="py-5">
      {testOption.map((option , i)=>{
          return (
            <RadioButton 
               key={i}
               color="#0369A1"
               label={option.option}
               value={option.id}
               selected={optionSelect == option.id? true:false}
               onPress={() => setOptionSelect(option.id)}
            />
          );
       })}
    </View>
   );
}

const styles = StyleSheet.create({})

export default TestOption;
