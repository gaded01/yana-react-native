import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';


const Logout = () => {
   const nav = useNavigation();
   let config = {};
   
   useEffect(()=>{
      const out = async() => {
         let response = await AsyncStorage.getItem('@access_token');
         config = {
            headers: {Authorization: `Bearer ${response}`}
         } 
         axios.post(`${process.env.REACT_APP_BASE_API_URL}/user-logout`, {}, config)
         .then((res)=> {
            AsyncStorage.removeItem('@access_token');
            nav.replace('Login');
         })
       };
       out();
   },[]);

   return (
      <View>
         
      </View>
   );
}

const styles = StyleSheet.create({})

export default Logout;
