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

const Healthtips = () => {
  const navigation = useNavigation();

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
          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              1. Don't forget your well visits and recommended screenings
              Studies show that about 10% fewer adults have annual contact with
              a medical professional when compared to kids. Although this may
              not be surprising, wellness visits are extremely important.
              Today's wellness exams go beyond the standard physical, allowing
              doctors to identify preventive measures that will keep you
              healthier and save you money.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              2. Exercise and stay active As you get older, it can be easy to
              find excuses to let yourself slow down. However, exercise is
              vitally important for seniors.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              3. Maintain strong bones Most of us really don't think about our
              bones until one breaks. However, bone health, like other aspects
              of your health, needs to be worked on for years. The good news is
              that it's never too late to take care of your bones and slow bone
              loss
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              4. Don't let joint pain slow you down Aging gracefully can
              sometimes be a pain … in your joints, that is. Whether from
              disease or injury, any damage can interfere with your movement and
              take a toll on your entire body.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              5. Eat a heart healthy diet Taking care of your heart should be a
              top priority for everyone. The good news is there are some easy
              ways to keep your heart ticking for years to come. Eating a heart
              healthy diet is an important first step
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              6. Take care of your eyes People see primary care doctors, the
              dentist and even mental health specialists on a regular basis. But
              are you taking proper care of your eyes, especially if you don’t
              already use corrective lenses? It’s important to have your eyes
              checked regularly to prevent eye diseases such as age-related
              macular degeneration, cataracts, glaucoma, low vision and even dry
              eyes. Set up an appointment now for a routine eye exam.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              7. Make sure your hearing is loud and clear Have you noticed that
              sometimes it’s hard to understand what people are saying even
              though you can hear them? Does your partner complain that you have
              the TV volume up too high? Do you have a persistent ringing in
              your ears? If so, you might be experiencing hearing loss, or a
              related condition called tinnitus.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              8. Keep a skip in your step Your feet and ankles are put under
              constant pressure making them susceptible, in some instances, to
              inflammation, pain and limited movement and flexibility. Taking
              care of your feet and wearing appropriate footwear is important to
              maintaining an active lifestyle.
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              9. Keep your medications organized and safe Especially as we age,
              you might need to take different medications to manage different
              health conditions. It’s important to review your medications
              regularly with your pharmacist and your health care provider to
              make sure everything is necessary and to identify possible
              interactions.
            </Text>
          </View>
          <View className="mb-2">
            <Text className="text-justify text-stone-600">
              10. Get your beauty rest Why does restful sleep get more elusive
              the older we get? Studies have shown that 50% of Americans over
              the age of 65 suffer from sleep problems; and as we age, losing
              sleep at night can also lead to other health concerns, like an
              increased risk of falling and daytime fatigue.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Healthtips;
