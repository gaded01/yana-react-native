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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RadioGroup, { RadioButton } from "react-native-radio-buttons-group";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import { useTestStatusContext } from "../../context/TestStatusContext";
import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import TestOption from "./TestOption";
import TestQuestion from "./TestQuestion";
import TestButton from "./TestButton";
import Result from "./Result";
import { useElderContext } from "../../context/ElderContext";

const ElderTest = () => {
	const navigation = useNavigation();
	const { testStatus, setTestStatus } = useTestStatusContext();
	const [prevAnswer , setPrevAnswer] = useState('');
	const { elder, setElder } = useElderContext();
	const [optionSelect, setOptionSelect] = useState("");
	const [loading, setLoading] = useState(false);
	let config = {};

	useEffect(() => {
		setLoading(true);
		console.log('run'); 
		const getItemNumber = async () => {
			let response = await AsyncStorage.getItem("@access_token");
			config = {
			headers: { Authorization: `Bearer ${response}` }, 
			};
			await axios
			.post(`${process.env.REACT_APP_BASE_API_URL}/test-item`, {elder_info_id: elder.elder_info.id },  config)
			.then((res) => {
				setPrevAnswer(res.data - 1);
				console.log('res,data', res.data)
				setTestStatus(() => res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log('err', error);
				setLoading(false);
			}); 
		};
		getItemNumber();
		setOptionSelect('');
	}, [elder]);

	const postAnswer = async () => {
		setLoading(true);
		let response = await AsyncStorage.getItem("@access_token");
		config = {
			headers: { Authorization: `Bearer ${response}` },
		};
		if (testStatus <= 42) {
			setTimeout(() => {
				axios.post(`${process.env.REACT_APP_BASE_API_URL}/test-answer`,
					{
						elder_info_id: elder.elder_info.id, 
						elderly_test_question_id: testStatus,
						elderly_test_option_id: optionSelect,
						page: testStatus + 1,
					}, 
					config
					
				)
				.then((res) => {
					setPrevAnswer((prevAnswer) => prevAnswer + 1);
					setTestStatus((prevStatus) => prevStatus + 1);
					!res.data.data.length? setOptionSelect('') : setOptionSelect(res.data.data[0].elderly_test_option_id);
				})
				.catch((error) => {
					console.log(error);
				});
			setLoading(false); 
			}, 3000);
		}
  	};
 
	const removeAnswer = async () => {
		setLoading(true);
		let response = await AsyncStorage.getItem("@access_token");
		config = {
			headers: { Authorization: `Bearer ${response}` },
		};
		setTimeout(() => { 
		axios.post(`${process.env.REACT_APP_BASE_API_URL}/remove-answer`,	{elder_info_id: elder.elder_info.id, page: prevAnswer},	config)
			.then((res) => {
				setOptionSelect(res.data.data[0].elderly_test_option_id);
				setTestStatus((prevStatus) => prevStatus - 1);
				setPrevAnswer((prevAnswer) => prevAnswer - 1);
			}) 
			.catch((error) => {
				console.log('err', error);
			});
		setLoading(false); 
		}, 3000);
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
			{testStatus <= 2?
				<>
					<View className="flex bg-yellow-400 py-3 px-5">
						<Text className="text-lg font-bold">Elder Abuse Test</Text>
					</View>
					<View className="flex px-10 mt-10">
						<TestQuestion />
						<TestOption
							setOptionSelect={setOptionSelect}
							optionSelect={optionSelect}
						/>
						<TestButton postAnswer={postAnswer} removeAnswer={removeAnswer}/>
					</View>
				</> 
			:
				<View className="flex-1 bg-yellow-400 py-3 px-5">
					<Result/>
				</View>
			}
			<Spinner visible={loading} />
		</SafeAreaView>
	);
};

export default ElderTest;
