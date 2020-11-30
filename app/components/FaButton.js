import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from "react-native";

const styles = StyleSheet.create({
  faButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    right: 15,
    backgroundColor: "rgb(201, 251, 0)",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default function(props) {
  return (
    <TouchableWithoutFeedback
      onPress={props.onPress}
    >
      <View style={styles.faButton} >
      {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
}
