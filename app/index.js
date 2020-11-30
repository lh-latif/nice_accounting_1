import "react-native-gesture-handler";
import React,{Component} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NativeModules,
  StatusBar,
  View,
  Text
} from "react-native";
// import LoginView from "./views/LoginView.js";
import NoteListView from "./views/NoteListView.js";
import NewNotebookView from "./views/NewNotebookView.js";
import NotebookView from "./views/NotebookView.js";
import NewEntryView from "./views/NewEntryView.js";

const AccountingModel = NativeModules.AccountingModule;
// console.log(AccountingModel);
// AccountingModel.getInt().then(number => console.log(number));
// AccountingModel.listNotebook().then(any => console.log("listNotebook",any));
let MainView = null;
const Stack = createStackNavigator();

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      view: "LoginView"
    };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="NoteList"
            component={NoteListView}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="NewNotebook"
            component={NewNotebookView}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Notebook"
            component={NotebookView}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="NewEntry"
            component={NewEntryView}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
        <StatusBar/>
      </NavigationContainer>
    );
  }
}
