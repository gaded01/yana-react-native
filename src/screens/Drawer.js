import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../screens/Home";
import Logout from "../screens/Logout";
import ElderTest from "./ElderTest";
import ElderInfo from "./ElderTest/ElderInfo";
import ElderRatingInfo from "./ElderRating/ElderInfo";
import ElderRating from "./ElderRating";
import ResultList from "./ElderTest/ResultList";
import HealthTips from "./Healthtips";
import HomeTips from "./HomeTips";
import Meditation from "./Meditation";
import Exercise from "./Exercise";


const Drawer = createDrawerNavigator();
const Root = () => {
   return ( 
      <Drawer.Navigator>
         <Drawer.Screen 
            name="Home" 
            component={Home} 
            options={{ 
               headerShown: false,
               // drawerItemStyle: { display: 'none' } 
            }}
         />
             <Drawer.Screen name="ElderInfo" component={ElderInfo} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen name="ElderTest" component={ElderTest} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen name="ResultList" component={ResultList} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen name="ElderRatingInfo" component={ElderRatingInfo} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen name="ElderRating" component={ElderRating} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
          <Drawer.Screen name="HealthTips" component={HealthTips} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen name="HomeTips" component={HomeTips} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen name="Meditation" component={Meditation} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen name="Exercise" component={Exercise} 
            options={{
               headerShown: false,
               drawerItemStyle: { display: 'none' } 
            }} 
         />
         <Drawer.Screen 
            name="Logout" 
            component={Logout} 
            options={{ 
               headerShown: false,
            }}
         />
     
      </Drawer.Navigator>
   );
}

export default Root;

