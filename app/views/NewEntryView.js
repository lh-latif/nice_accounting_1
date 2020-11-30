import React from "react";
import {
  NativeModules,
  Button,
  Pressable,
  StyleSheet,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";
import ViewHeader from "../components/ViewHeader.js";
import {add_notebook_entry} from "../notebook.js";
import * as entry from "../entry.js";
// console.log(entry);


export default class NewEntryView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "nice",
      note: "",
      type: "in",
      value: "0",
      typeSwitch: true
    };

  }

  onAmountInput(value) {
    this.setState({
      value: value,
    });
  }

  onNoteInput(note) {
    this.setState({
      note: note
    });
  }

  onTypeInput(type) {

  }

  onSubmit() {
    // console.log(this.props.route.params);
    const note = this.props.route.params.notebook;
    var type = this.state.type;
    const data = {
      notebook_id: note.id,
      value: Number.parseInt(this.state.value),
      type: type,
      note: this.state.note,
    };

    const stringify = JSON.stringify(data);
    // console.log(stringify);
    NativeModules.AccountingModule.addNotebookEntry(stringify)
      .then((res) => {
        // console.log(res);
        this.props.navigation.goBack();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <>
        <ViewHeader>
        </ViewHeader>
        <ScrollView>
          <View style={styles.formContainer}>
            <View>
              <Text>Tipe</Text>
              <View style={styles.typeContainer}>

                <View style={[
                  styles.typeBox,
                  this.state.type == "in"?styles.typeIn:styles.typeDisable
                ]}>
                  <Pressable style={styles.pressable} onPress={() => this.setState({type: "in"})} >
                    <Text>Pemasukan</Text>
                  </Pressable>
                </View>


                <View style={[
                  styles.typeBox,
                  this.state.type == "out"?styles.typeOut:styles.typeDisable
                ]}>
                  <Pressable style={styles.pressable} onPress={() => this.setState({type: "out"})} >
                    <Text>Pengeluaran</Text>
                  </Pressable>
                </View>

              </View>
            </View>
            <View>
              <Text>Jumlah</Text>
              <TextInput
                keyboardType="numeric"
                value={this.state.value}
                onChangeText={(val) => this.onAmountInput(val)}
              />
            </View>
            <View>
              <Text>Catatan</Text>
              <TextInput
                value={this.state.note}
                multiline
                onChangeText={(val) => this.onNoteInput(val)}
              />
            </View>
            <Button onPress={() => this.onSubmit()} title="Simpan" />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = {
  formContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 20,
    padding: 10
  },
  typeBox: {
    borderWidth: 3,
    borderStyle: "solid",
    // padding: 10,
    width: "40%",
    // height: 40,
    // textAlign: "center",
    // justifyContent: "center"
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 8
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  typeOut: {
    borderColor: "rgb(226, 73, 73)",
    backgroundColor: "rgb(226, 73, 73)"
  },
  typeIn: {
    borderColor: "rgb(93, 226, 74)",
    backgroundColor: "rgb(93, 226, 74)",
  },
  pressable: {
    alignItems: "center",
    margin: 0,
    height: "100%",
    width: "100%",
    padding: 10
  }
};
