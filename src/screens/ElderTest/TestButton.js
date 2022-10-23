import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { useTestStatusContext } from '../../context/TestStatusContext';

const TestButton = ({postAnswer, removeAnswer}) => {
   const { testStatus } = useTestStatusContext();
   return (
      <View className="flex-row justify-between border-t-2 py-3">
         {testStatus == 1? null  : 
            <TouchableOpacity
               className="bg-sky-600 rounded-lg w-28 py-2"
               onPress={removeAnswer}
            >
               <Text
                  className="text-center text-base text-white"
               >
                  Prev
               </Text>
            </TouchableOpacity>
         }
            <TouchableOpacity
               className="bg-sky-600 rounded-lg w-28 py-2"
               onPress={postAnswer}
            >
               <Text
                  className="text-center text-base text-white"
               >
                  Next
               </Text>
            </TouchableOpacity>
      </View>
   );
}
const styles = StyleSheet.create({})

export default TestButton;
