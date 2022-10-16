import React from 'react';
import 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from "../screens/GetStarted";
import Login from "../screens/Login";
import Register from "../screens/Registration";

const Stack = createNativeStackNavigator();
const AppStack = () => {
   return (
      <Stack.Navigator defaultScreenOptions={GetStarted}>
         <Stack.Screen name="GetStarted" component={GetStarted} 
            options={{ 
               headerShown: false,
            }}
         />
         <Stack.Screen name="Login" component={Login} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="Register" component={Register} 
            options={{
               headerShown: false
            }} 
         />
      </Stack.Navigator>
   );
}
const styles = StyleSheet.create({})

export default AppStack;
