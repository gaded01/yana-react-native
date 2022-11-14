import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TestStatusContext } from "./src/context/TestStatusContext";
import { ElderContext } from "./src/context/ElderContext";
import { MonitorContext } from "./src/context/ElderMonitorContext";
import { NavigationContainer } from "@react-navigation/native";
import { TailwindProvider } from "tailwindcss-react-native";
import AppStack from "./src/navigation/AppStack";



export default function App() {
  const [testStatus, setTestStatus] = useState(1);
  const [elder, setElder] = useState('');
  const [monitor, setMonitor] = useState('');

  
  return (
    <NavigationContainer>
      <TailwindProvider>
        <TestStatusContext.Provider value={{ testStatus, setTestStatus }}>
          <ElderContext.Provider value={{ elder, setElder }}>
          <MonitorContext.Provider value={{ monitor, setMonitor }}>
          <AppStack />
          </MonitorContext.Provider>
          </ElderContext.Provider>
        </TestStatusContext.Provider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
