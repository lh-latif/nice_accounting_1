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
    this.onSubmit = this.onSubmit.bind(this);
    this.noteOnChange = this.noteOnChange.bind(this);
  }

  noteOnChange(note) {
    this.setState({note: note});
  }

  onSubmit() {
    AccountingModule.addNotebook(
      this.state.name,
      this.state.note
    )
    .then((id) => {
      // console.log("added notebook id: ",id);
      this.props.navigation.navigate("NoteList");
    })
    .catch((err) => {
      console.error(err)
    });
  }

  render() {
    return (
      <>
        <ViewHeader>
          <Text>Catatan Baru</Text>
        </ViewHeader>
        <View>
          <ScrollView>
            <View style={styles.formContainer}>
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
                onPress={this.onSubmit}
              />
            </View>
          </ScrollView>
        </View>
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
  }
};
