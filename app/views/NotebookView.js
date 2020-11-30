import React from "react";
import {
  NativeModules,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback as TouchWF,
  View
} from "react-native";
import ViewHeader from "../components/ViewHeader.js";
import FaButton from "../components/FaButton.js";
import Icon from "react-native-vector-icons/MaterialIcons";
// console.log(Icon);

const styles = StyleSheet.create({
  headerBack: {
    fontSize: 30,
    marginRight: 20,
    color: "rgb(50, 50, 50)",
  },
  listEntryContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
    flex: 2
  },
  entryContainer: {
    padding: 10,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: "column"
  },
  fillerBottom: {
    height: 150,
  },
  entryRow1: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10
    // justifyContent: "center",
    // width: "fill"
  },
  entryAmount: {
    flex: 2
  },
  entryRow2: {
    margin: 10,
    marginBottom: 0,
    borderTopWidth: 1,
    borderColor: "rgb(138, 138, 138)",
    padding: 10,
    // paddingBottom: 0,
  },
  bottomMenu: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 15,
  },
  typeIcon: {
    // margin: 10,
    fontSize: 25,
    marginLeft: 5,
    marginRight: 5,
  }
});

const IN_ICON = <Icon
  size={30}
  name="arrow-forward"
  color="rgb(49, 196, 137)"
  style={styles.typeIcon}
/>;

const OUT_ICON = <Icon
  name="arrow-back"
  color="rgb(249, 76, 76)"
  style={styles.typeIcon}
/>;

function typeIcon(type) {
  if (type == "in") {
    return IN_ICON;
  } else {
    return OUT_ICON;
  }
}

function getDateTime(date) {
  return (date.getMonth()+1)+"-"+date.getDate()+"-"+ date.getFullYear();
}

export default class NotebookView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: []
    };
    this.onFocusUnsubs = this.props.navigation.addListener("focus",() => {
      console.log("focus");
      this.getNotebookEntry();
      this.hasSetup = true;
    });

    this.deleteNotebook = this.deleteNotebook.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  toNewEntryView() {
    this.props.navigation.navigate("NewEntry",{notebook: this.props.route.params, list_entry: this.state.entry});
  }

  getNotebookStats() {
    NativeModules.AccountingModule.getStatistic(this.props.route.params.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }



  getNotebookEntry() {
    // this.getNotebookStats();
    // console.log(this.props.route.params);
    NativeModules.AccountingModule.listNotebookEntry(this.props.route.params.id)
      .then((res) => {
        // console.warning(res);
        this.setState({
          entry: JSON.parse(res)
            .map((item) => {
              const date = new Date(item.inserted_at);
              item.inserted_at = date;
              return item;
            })
        });
      });
  }

  deleteNotebook() {

    NativeModules.AccountingModule.deleteNotebook(this.props.route.params.id)
    .then((res) => {
      if (res) {
        // console.log("berhasil hapus notebook");
        this.goBack();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    // this.getNotebookEntry();
    // console.log("did mount");
    if (this.hasSetup == null) {
      this.getNotebookEntry();
    }
  }

  componentWillUnmount() {
    // console.log("unmount notebook view");
    this.onFocusUnsubs();
  }

  render() {
    return (
      <>
        <ViewHeader>
          <TouchWF onPress={() => this.goBack()}>
            <Icon
              style={styles.headerBack}
              name="arrow-back"
            />
          </TouchWF>
          <View>
            <Text>{this.props.route.params.name}</Text>
          </View>
        </ViewHeader>
        <ScrollView style={styles.listEntryContainer}>
        {
          this.state.entry.map((item) => (
            <TouchWF key={item.id}>
              <View style={styles.entryContainer}>
                <View style={styles.entryRow1}>
                  {typeIcon(item.type)}
                  <View style={styles.entryAmount} >
                    <Text>Rp {item.value}</Text>
                  </View>
                  <Text>
                    {getDateTime(item.inserted_at)}
                  </Text>
                </View>
                {
                  item.note == null || item.note == ""?
                  null :
                  (
                    <View style={styles.entryRow2}>
                      <Text>{item.note}</Text>
                    </View>
                  )
                }
              </View>
            </TouchWF>
          ))
        }
        <View style={styles.fillerBottom}/>
        </ScrollView>
        <View style={styles.bottomMenu}>
          <TouchWF onPress={this.deleteNotebook}>
            <Text>Hapus Note</Text>
          </TouchWF>
          <View>
            <Text>Ubah Nama</Text>
          </View>
          <TouchWF onPress={() => this.toNewEntryView()}>
            <Text>Tambah Entry</Text>
          </TouchWF>
        </View>
      </>
    );
  }
}
