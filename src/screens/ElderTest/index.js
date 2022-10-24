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
				setTestStatus(() => res.data);
				setOptionSelect(''); 
				setLoading(false);
			})
			.catch((error) => {
				console.log('err', error);
				setLoading(false);
			});
		};
		getItemNumber();
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
					},
					config
				)
				.then(() => {
					console.log("success");
					setTestStatus((prevStatus) => prevStatus + 1);
				})
				.catch((error) => {
					console.log(error);
				});
			setLoading(false); 
			setOptionSelect(''); 
			}, 3000);
		}
		console.log("test", testStatus);
  	};

	const removeAnswer = async () => {
		setLoading(true);
		let response = await AsyncStorage.getItem("@access_token");
		config = {
			headers: { Authorization: `Bearer ${response}` },
		};
		setTimeout(() => {
		axios.post(`${process.env.REACT_APP_BASE_API_URL}/remove-answer`,	{elder_info_id: elder.elder_info.id},	config)
			.then(() => {
				console.log("success");
				setTestStatus((prevStatus) => prevStatus - 1);
			})
			.catch((error) => {
				console.log('err', error);
			});
		setLoading(false);
		setOptionSelect(''); 
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
			{testStatus <= 42?
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
