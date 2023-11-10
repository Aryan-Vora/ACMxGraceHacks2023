import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  return (
    <>
      <View style={styles.container}></View>
      <WebView
        source={{ uri: "http://100.64.18.152:5173/" }}
        style={{ flex: 1 }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: "black",
  },
});
