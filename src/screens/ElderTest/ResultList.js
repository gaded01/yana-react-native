import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioGroup, { RadioButton } from "react-native-radio-buttons-group";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import { useTestStatusContext } from "../../context/TestStatusContext";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import { useElderContext } from "../../context/ElderContext";


const ResultList = () => {
	const navigation = useNavigation();
   const { elder, setElder } = useElderContext();
	const [testAnswers, setTestAnswers] = useState([]);
   const [testResult, setTestResult] = useState();
	const [loading, setLoading] = useState(false);
   let config = {};

	useEffect(() => {
		setLoading(true);
		const getItemNumber = async () => {
			let response = await AsyncStorage.getItem("@access_token");
			config = {
			headers: { Authorization: `Bearer ${response}` },
			};
			await axios
			.post(`${process.env.REACT_APP_BASE_API_URL}/view-result`, {elder_info_id: elder.elder_info.id},  config)
			.then((res) => {
            setTestAnswers(res.data);
            console.log('ans', res.data);
         })
			.catch((error) => {
				console.log('err', error);
			});
		};
		getItemNumber();
      setLoading(false);
	}, []);

   const printResult = async () => {
      let response = await AsyncStorage.getItem('@access_token');
      config = {
         headers: {Authorization: `Bearer ${response}`}
      }
      const data = {
         total_score: testAnswers.result.total_score,
         result:  testAnswers.result.test_abuse_level.abuse_level,
      }
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/print-pdf`, data, config)
      .then((res) => {
         console.log('res', res)
         alert('Print result not available yet!');
      })
      .catch((error)=>{
         console.log(error)
         alert('Please try again');
      })
      setLoading(false);
   }
	
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
            <View className="flex bg-yellow-400 py-3 px-5">
               <Text className="text-lg font-bold">Test Result</Text>
            </View>
            <View className="flex w-full pb-20 items-center h-4/5">
               <ScrollView
                  vertical
                  contentContainerStyle={{
                     paddingVertical: 0,
                     flexGrow: 1,
                     
                  }}
                  showsHorizontalScrollIndicator={false}
               >
               {Object.keys(testAnswers).length?
                  testAnswers.answers.map((answer, i) => {
                     return (
                        <View key={answer.id}>
                           <View className="flex-row items-center  w-80 mt-5">
                              <View className="bg-sky-600 w-10 h-10 justify-center items-center rounded-3xl">
                                 <Text className="text-white text-base">{answer.elderly_test_question.id}</Text>
                              </View>
                              <View className="w-72 ml-5">
                                 <Text className="text-sky-600 text-lg">{answer.elderly_test_question.question}</Text>
                              </View>
                           </View>
                           <View className="flex-row items-center w-80">
                              <View className="text-white w-10 h-10 justify-center items-center rounded-3xl">
                                 <Text className="text-white text-base">1</Text>
                              </View>
                              <View className="w-72 ml-5">
                                 <Text className="text-sm text-stone-500">Answer: {answer.elderly_test_option.option}</Text>
                              </View>
                           </View>
                        </View>
                     )
                  })
                  :
                  null
               }
               </ScrollView>
               <View></View>
               <TouchableOpacity
                  className="bg-yellow-400 mt-4 rounded-lg w-40 h-14"
                  onPress={() => printResult()}
               >
                     <Text className="text-base text-center px-4 pt-4">
                        Print Result
                     </Text>
               </TouchableOpacity>
            </View>
			<Spinner visible={loading} />
		</SafeAreaView>
	);
};

export default ResultList;
