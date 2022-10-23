import React from 'react';
import {StyleSheet} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from "../screens/GetStarted";
import Login from "../screens/Login";
import Register from "../screens/Registration";
import HomePanel from "../screens/HomePanel";
import Home from "../screens/Home";
import ElderTest from "../screens/ElderTest";
import ElderInfo from "../screens/ElderTest/ElderInfo";
import ElderRatingInfo from "../screens/ElderRating/ElderInfo";
import ElderRating from "../screens/ElderRating";
import ResultList from "../screens/ElderTest/ResultList";
import HealthTips from "../screens/Healthtips";
import HomeTips from "../screens/HomeTips";
import Meditation from "../screens/Meditation";
import Exercise from "../screens/Exercise";
import Drawer from "../screens/Drawer";


const Stack = createNativeStackNavigator();
const AppStack = () => {
   return (
      <Stack.Navigator initialRouteName="GetStarted">
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
         <Stack.Screen name="HomePanel" component={HomePanel} 
            options={{
               headerShown: false
            }} 
         />
          {/* <Stack.Screen name="ElderInfo" component={ElderInfo} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="ElderTest" component={ElderTest} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="ResultList" component={ResultList} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="ElderRatingInfo" component={ElderRatingInfo} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="ElderRating" component={ElderRating} 
            options={{
               headerShown: false
            }} 
         /> */}
         {/* <Stack.Screen name="HealthTips" component={HealthTips} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="HomeTips" component={HomeTips} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="Meditation" component={Meditation} 
            options={{
               headerShown: false
            }} 
         />
         <Stack.Screen name="Exercise" component={Exercise} 
            options={{
               headerShown: false
            }} 
         /> */}
          <Stack.Screen name="Drawer" component={Drawer} 
            options={{
               headerShown: false
            }} 
         />
      </Stack.Navigator>
   );
}
const styles = StyleSheet.create({})

export default AppStack;
