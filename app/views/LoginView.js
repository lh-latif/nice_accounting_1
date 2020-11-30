import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  Pressable
} from "react-native";
import NumberInput from "../components/NumberInput.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgb(255, 252, 238)",
    padding: 20
  },
  input: {
    // width: 100,
    // height: 30,
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 3,
    padding: 5,
    // flex: 1,
    backgroundColor: "white"
  },
  formGroup: {
    marginBottom: 10
  },
  formLabel: {
    marginBottom: 5,
    color: "rgb(47, 47, 47)",
    fontSize: 14
  },
  header: {
    height: 64,
    padding: 15,
    backgroundColor: "rgb(255, 137, 106)"
  },
  headerText: {
    fontSize: 24,
    color: "rgb(255, 255, 255)"
  },
  button: {
    backgroundColor: "rgb(230, 102, 77)"
  },
  formContainer: {
    marginTop: 30,
    marginBottom: 20
  }
});

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: ""
    }

    this.login = () => {
      // this.props.routeTo("ChatListView");
      console.log("Pressed");
      this.props.navigation.reset({routes: [{name: "NoteList"}]});
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Username</Text>
              <TextInput
                style={styles.input}
                value={this.state.name}
                onChange={(ev) =>
                  this.setState({name: ev.target.value})
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={this.state.password}
                onChange={(ev) =>
                  this.setState({password: ev.target.value})
                }
              />
            </View>
          </View>

          <Pressable
            style={styles.button}
            color="rgb(230, 102, 77)"
            title="Login"
            onPressIn={this.login}
          >
            <View>
              <Text>Login</Text>
            </View>
          </Pressable>

          <NumberInput />
        </View>
      </View>
    );
  }
}

export default LoginView;
