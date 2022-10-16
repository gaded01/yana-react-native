import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
});