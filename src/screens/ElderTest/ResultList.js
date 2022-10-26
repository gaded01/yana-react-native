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
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';



const ResultList = () => {
	const navigation = useNavigation();
   const { elder, setElder } = useElderContext();
	const [testAnswers, setTestAnswers] = useState([]);
   const [testResult, setTestResult] = useState();
	const [loading, setLoading] = useState(false);
   const [selectedPrinter, setSelectedPrinter] = React.useState();
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
   const html = `
      <html>
      <head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      </head>
      <body style="font-size: 25px">
         <h1 style="font-size: 30px; font-family: Helvetica Neue; font-weight: bold;">
            ELDER TEST RESULT
         </h1>
         ${(function answers() {
            let string = "";
            if(Object.keys(testAnswers).length){
               string += `
                  <p>Elder's complete name: ${testAnswers.elder.first_name} ${testAnswers.elder.last_name}</p>
                  <p>Birthdate: ${testAnswers.elder.birthdate}</p>
                  <p>Address: ${testAnswers.elder.address}</p>
                  <p>Result: ${testAnswers.result.test_abuse_level.abuse_level} </p>

                  <p style="font-weight: 500">Answers</p>
               `;
               for (let i = 0; i < testAnswers.answers.length; i++) {
                  const element = testAnswers.answers[i];
                  string += `<p>${element.elderly_test_question.id}. ${element.elderly_test_question.question} - <span style="font-weight: 500">${element.elderly_test_option.option}</span></p>`;
               }
               return string;
            }
           
          })()
         }
      </body>
      </html>
   `;

   const print = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      await Print.printAsync({
        html,
        printerUrl: selectedPrinter?.url, // iOS only
      });
   };

   const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({ html });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
   };

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
         printToFile(res.data)
         console.log('res', res)
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
            <View className="flex w-full pb-20  h-4/5">
               {Object.keys(testAnswers).length?
                  <View className="py-5 px-5">
                     <Text className="font-bold text-base">Elder's name: <Text className="font-normal">{testAnswers.elder.first_name} {testAnswers.elder.last_name}</Text></Text>
                     <Text className="font-bold text-base">Birthdate: <Text className="font-normal">{testAnswers.elder.birthdate}</Text></Text>
                     <Text className="font-bold text-base">Address: <Text className="font-normal">{testAnswers.elder.address}</Text></Text>
                     <Text className="font-bold text-base">Result: <Text className="font-normal">{testAnswers.result.test_abuse_level.abuse_level}</Text></Text>
                  
                  </View>
                  :
                  null
               }
               <Text className="text-base text-center font-bold">ANSWERS</Text>
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
                        <View className="flex items-center px-5" key={answer.id}>
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
               <View className="flex items-center">
                  <TouchableOpacity
                     className="bg-yellow-400 mt-4 rounded-lg w-40 h-14"
                     onPress={() => print()}
                  >
                        <Text className="text-base text-center px-4 pt-4">
                           Print Result
                        </Text>
                  </TouchableOpacity>
               </View>
            </View>
			<Spinner visible={loading} />
		</SafeAreaView>
	);
};

export default ResultList;
