import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { useTestStatusContext } from '../../context/TestStatusContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const TestQuestion = () => {
   const [testQuestion, setTestQuestion] = useState([]);
   const { testStatus } = useTestStatusContext();
   let config = {};

   useEffect(()=> {
      const fetchQuestion = async () => {
         const params = {key: "value"}; 
         const resToken = await AsyncStorage.getItem('@access_token');  
         config = {
            headers: {Authorization: `Bearer ${resToken}`}
         } 
         await axios.post(`${process.env.REACT_APP_BASE_API_URL}/get-test-question/`+testStatus , params, config)
         .then((res) => {
            setTestQuestion(res.data)
         })
         .catch((error) => {
            return error;
         })
      }
      fetchQuestion(); 
   }, [testStatus]);

   return (
      <View>
         <Text className="text-lg text-sky-800">{testQuestion.id+". " + testQuestion.question}</Text>
      </View>
   );
}

const styles = StyleSheet.create({})

export default TestQuestion;
