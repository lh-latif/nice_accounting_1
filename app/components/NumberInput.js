import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  block: {
    flex: 1,
    height: 50,
    margin: 2,
    backgroundColor: "blue",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20
  }
});

const Block = (number) => (
  <TouchableOpacity style={styles.block}>
    <Text style={styles.text}>{number}</Text>
  </TouchableOpacity>
)

export default class NumberInput extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.row} >
          {Block(1)}
          {Block(2)}
          {Block(3)}
        </View>
        <View style={styles.row} >
          {Block(4)}
          {Block(5)}
          {Block(6)}
        </View>
        <View style={styles.row} >
          {Block(7)}
          {Block(8)}
          {Block(9)}
        </View>
        <View style={styles.row} >
          {Block(null)}
          {Block(0)}
          {Block("<")}
        </View>
      </View>
    )
  }
}
