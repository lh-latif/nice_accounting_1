import React from "react";
import {
  NativeModules,
  Button,
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
      note: "nice",
      type: true,
      value: 100000,
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
    console.log(this.props.route.params);
    const note = this.props.route.params.notebook;
    var type;
    if (this.state.type) {
      type = "in";
    } else {
      type = "out";
    }
    const data = {
      notebook_id: note.id,
      value: this.state.value,
      type: type,
      note: this.state.note,
    };

    const stringify = JSON.stringify(data);
    console.log(stringify);
    NativeModules.AccountingModule.addNotebookEntry(stringify)
      .then((res) => { console.log(res)})
      .catch((err) => {console.error(err);});
    // const new_entry = new entry.Entry(this.props.route.params.notebook);
    // new_entry.setAmount(this.state.value);
    // new_entry.setNote(this.state.note);
    // new_entry.setType(this.state.typeSwitch? entry.ENTRY_TYPE_IN : entry.ENTRY_TYPE_OUT);
    // add_notebook_entry(this.props.route.params.list_entry,new_entry)
    //   .then(() => {
    //     this.props.navigation.goBack();
    //   })
    //   .catch((error) => {
    //     console.log(error,"error");
    //   });
  }

  render() {
    return (
      <>
        <ViewHeader>
        </ViewHeader>
        <ScrollView>
          <View>
            <Text>type</Text>
            <Switch
              value={this.state.typeSwitch}
              onChange={() =>
                this.setState(
                  (state) => ({typeSwitch: !state.typeSwitch})
                )
              }
            />
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
            <Text>note</Text>
            <TextInput
              value={this.state.note}
              multiline
              onChangeText={(val) => this.onNoteInput(val)}
            />
          </View>
          <Button onPress={() => this.onSubmit()} title="Simpan" />
        </ScrollView>
      </>
    );
  }
}
