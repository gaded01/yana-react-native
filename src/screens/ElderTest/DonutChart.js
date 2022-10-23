import React, { useRef, useEffect} from 'react';
import {View, Text, Animated, TextInput, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const DonutChart = ({
   score,
   radius = 100,
   strokeWidth = 20,
   duration = 500,
   color = 'tomato',
   textColor = 'black',
   delay = 500,
   max = 126,
}) => {
   const animatedValue = useRef(new Animated.Value(0)).current;
   const circleRef = useRef();
   const inputRef = useRef();
   const halfCircle = radius + strokeWidth;
   const circleCircumference = 2 * Math.PI * radius;
   const animation = (toValue) => {
      return Animated.timing(animatedValue, {
         toValue,
         duration,
         delay,
         useNativeDriver: true,
      }).start()
   }

   useEffect(()=> {
      console.log('score', typeof(score))
      animation(score);
      animatedValue.addListener((v) => {
         if(circleRef?.current) {
            const maxPercentage = 100 * v.value / max;
            const strokeDashoffset = circleCircumference - (circleCircumference * maxPercentage) / 100; 
            circleRef.current.setNativeProps({
               strokeDashoffset,
            })
         }
         if(inputRef?.current) {
            inputRef.current.setNativeProps({
               text: `${Math.round(v.value)}`
            })
         }
      })
      return () => {
         animatedValue.removeAllListeners();
      }
   },[score])
   return (
      <View className="flex-row justify-center">
         <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}> 
            <G rotation='-90' origin={`${halfCircle}, ${halfCircle}`}>
               <Circle
                  cx='50%'
                  cy='50%'
                  stroke={color}
                  strokeWidth={strokeWidth}
                  r={radius}
                  fill="transparent"
                  strokeOpacity={0.2}
               />
                 <AnimatedCircle
                  ref={circleRef}
                  cx='50%'
                  cy='50%'
                  stroke={color}
                  strokeWidth={strokeWidth}
                  r={radius}
                  fill="transparent"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={circleCircumference}
                  strokeLinecap="round"

               />
               <Circle/>
            </G>
         </Svg>
         <AnimatedInput
            ref={inputRef}
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue='0'
            style={[
               StyleSheet.absoluteFillObject,
               { fontSize: radius / 2, color: textColor ?? color},
               {fontWeight: '700', textAlign: 'center'}
            ]}
         />
      </View>
   );
}

export default DonutChart;
