import React from "react";
import {
  NativeModules,
  Button,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import ViewHeader from "../components/ViewHeader.js";
import {add_notebook} from "../accounting.js";
const AccountingModule = NativeModules.AccountingModule;

export default class NewNotebookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      note: ""
    };
    this.onChange = (name) => {
      this.setState({name: name});
    };
    this.onPress = (ev) => {
      // add_notebook(this.state.name)
      //   .then(() => {
      //     this.props.navigation.navigate("NoteList");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      AccountingModule.addNotebook(
        this.state.name,
        this.state.note
      ).then((id) => console.log("added notebook id: ",id))
      .catch(((err) => console.error(err)));
    }
    this.noteOnChange = this.noteOnChange.bind(this);
  }

  noteOnChange(note) {
    this.setState({note: note});
  }

  render() {
    return (
      <>
        <ViewHeader>
          <Text>Catatan Baru</Text>
        </ViewHeader>
        <View>
          <ScrollView>
            <Text>Name</Text>
            <TextInput
              value={this.state.name}
              onChangeText={this.onChange}
            />
            <Text>Note</Text>
            <TextInput
              value={this.state.note}
              onChangeText={this.noteOnChange}
            />
            <Button
              title="Tambah"
              onPress={this.onPress}
            />
          </ScrollView>
        </View>
      </>
    );
  }


}
