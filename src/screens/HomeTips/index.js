import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import SafeViewAndroid from "../../components/SafeViewAndroid";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const Hometips = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="flex px-2 py-5">
        <View className="flex-row justify-between items-center">
          <Image
            source={require("../../../assets/header-logo.png")}
            className="h-20 w-60"
          />
          <Bars3BottomRightIcon
            color="#000"
            size="35"
            onPress={() => navigation.openDrawer()}
          />
        </View>
      </View>
      <View className="flex bg-yellow-400 py-3 px-5">
        <Text className="text-lg font-bold">Hometips</Text>
      </View>
      <View className="flex items-center px-10 pb-44 mt-5">
        <ScrollView
          vertical
          contentContainerStyle={{
            paddingVertical: 0,
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
          className=""
        >
          <Text className="text-base font-bold mb-2">
            Top 10 Tips For Caring For Older Adults
          </Text>
          <Text className="text-justify text-stone-600 mb-2">
            The creeping prevalence of aging societies isn’t just a challenge
            for national governments, policymakers, and healthcare providers to
            solve. It affects everyone who has, or will have, an elder family
            member or loved one in their lives—and everyone lucky enough to grow
            old themselves.
          </Text>
          <Text className="text-justify text-stone-600 mb-2">
            Remaining in good health as an older adult requires much more than
            what medication and treatment alone have to offer. Below are ten
            pieces of advice, and some accompanying resources, for those who
            want their loved ones to age as comfortably, independently, and
            vibrantly as possible.
          </Text>
          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              1. <Text className="font-bold">Keep care at home if possible.</Text> Try to find care providers who
              are willing to provide care for your loved one outside a hospital
              setting and in the home. For some care providers this may mean
              home visits, for others it could mean telehealth appointments.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              2. <Text className="font-bold">Coordinate your care.</Text> Try to coordinate services among all
              those providing care for your loved one—both formal and informal.
              This means everyone from the primary care physician to the person
              who may come in once a week to clean the house. 
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              3. <Text className="font-bold">Make care regimens person centered.</Text>  Encourage your loved one to
              make their own decisions about the type of care they receive and
              when and where they would like to receive it. 
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              4. <Text className="font-bold">Enable social inclusion.</Text>  Create opportunities for your loved
              one to play an active role in your family and in your community.
              Isolation can be a major cause of emotional distress for older
              people. 
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              5. <Text className="font-bold">Stay up to date on the latest technology.</Text>  Keep abreast of new
              technologies that can improve every aspect of care your loved one
              receives. These may be as simple as FaceTime appointments with
              your doctor, or as advanced as safety monitoring systems connected
              to a coordinated care network.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              6. <Text className="font-bold">Investigate your insurance options.</Text> Explore long term care
              insurance options in detail and find the one that is right for
              your situation.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              7. <Text className="font-bold">Take care of the caregivers.</Text> Recognize the challenges inherent
              in caring for a loved one in need and make use of any resources
              available to you in these efforts. This may include online support
              networks, opportunities to spend time away from your loved one, or
              rejuvenatory activities to help relieve stress and tension.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              8. <Text className="font-bold">Learn and practice mindful communication.</Text>  Don't be afraid to
              have what can be a tough conversation about end of life care with
              your loved one. Make use of the tools and resources available
              online to talk with your loved one about the kind of treatment
              they receive and where they would like to receive it.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              9.<Text className="font-bold">Educate yourself.</Text> Try to keep up to date with the latest
              innovations in elder care and best practices in long term care.
            </Text>
          </View>
          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              10. <Text className="font-bold">Create a safe environment.</Text>  Make sure the environment in which
              your loved one lives encourages their independence and autonomy,
              mitigates and risk of injury or harm, and feels like a
              personalized home environment.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Hometips;
