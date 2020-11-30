import React from "react";
import {
  StyleSheet,
  View
} from "react-native";

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: "rgb(255, 251, 0)",
    padding: 15,
    alignItems: "center",
    flexDirection: "row"
  }
})

export default function(props) {
  return (
    <View style={styles.header}>
      {props.children}
    </View>
  );
}
