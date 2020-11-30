import React from "react";
import {
  NativeModules,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback as TouchWF,
  TouchableOpacity as TouchOp
} from "react-native";
import Header from "../components/ViewHeader.js";
import Icon from "react-native-vector-icons/MaterialIcons.js";
// import {list_notebook} from "../accounting.js";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    color: "rgba(50, 50, 50, 1)",
    fontWeight: "bold"
  },
  listNoteContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
    paddingBottom: 150
  },
  noteContainer: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "row"
  },
  noteSect1: {
    flex: 2
  },
  noteTitle: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    color: "rgb(38, 38, 38)"
  },
  noteAmount: {
    color: "rgb(50, 50, 50)",
    marginBottom: 5
  },
  lineBottom: {
    height: 1,
    backgroundColor: "rgb(27, 27, 27)"
  },
  faButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    right: 15,
    backgroundColor: "rgb(255, 251, 0)",
    justifyContent: "center",
    alignItems: "center"
  },
  fabAdd: {
    justifyContent: "center",
    alignItems: "center"
  },
  iconAdd: {
    color: "rgb(41, 41, 41)",
    fontSize: 20
  }
});

export default class NoteListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };

    this.onFocusUnsubs =
      this.props.navigation.addListener(
        "focus",
        () => {
          this.getListNotebook();
        }
      );

    this.onPress = (notebook) => {
      props.navigation.navigate("Notebook",notebook)
    }
  }

  toNewNoteView() {
    this.props.navigation.navigate("NewNotebook")
  }

  getListNotebook() {
    NativeModules.AccountingModule.listNotebook()
    .then((res) => {
      this.setState({notes: JSON.parse(res)});
    })
    // list_notebook()
    //   .then((res) => {
    //     // console.log(res,"did mount");
    //     this.setState({notes: res.rows});
    //   });
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.onFocusUnsubs();
  }

  render() {
    return (
      <>
        <Header>
          <Text style={styles.headerText}>
            Nice Accounting
          </Text>
        </Header>
        <ScrollView>
          <View style={styles.listNoteContainer}>
          {this.state.notes.map((item,index) => (
              <TouchWF key={index} onPress={() => this.onPress(item)}>
                <View style={styles.noteContainer}>
                  <View style={styles.noteSect1}>
                    <Text style={styles.noteTitle}>{item.name}</Text>
                    <Text style={styles.noteAmount}>Rp {item.amount}</Text>
                  </View>
                </View>
              </TouchWF>
            ))
          }
          </View>
        </ScrollView>
        <TouchOp style={styles.faButton} onPress={() => this.toNewNoteView()}>
          <View>
            <View style={styles.fabAdd} >
              <Icon
                name="add"
                style={styles.iconAdd}
              />
              <Text>Tambah</Text>
            </View>
          </View>
        </TouchOp>
      </>
    )
  }
}
