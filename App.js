
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from "tailwindcss-react-native";
import AppStack from './src/navigation/AppStack'


export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <AppStack/>
			</TailwindProvider>
    </NavigationContainer>

  );
}

