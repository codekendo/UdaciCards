import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import React from "react"
import { connect } from "react-redux"
import { white, black } from "./Stylesheet"
import { addDeckInRedux } from "../actions"
import { submitNewDeckTitle } from "../utils/api"
class NewDeckView extends React.Component {
  state = {
    title: ""
  }

  check = title => {
    if (this.props.data[title]) {
      return false
    } else {
      return true
    }
  }

  submit = () => {
    const { title } = this.state
    if (this.check(title)) {
      submitNewDeckTitle(title)
        .then(() => this.props.addDeck(title))
        .then(() => this.props.navigation.navigate("Home"))
    } else {
      alert("Use a different title")
    }
  }
  render() {
    return (
      <View>
        <View style={{ marginTop: 12, padding: 8 }}>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View>
          <TextInput
            style={{ height: 48, borderColor: "gray", borderWidth: 2 }}
            placeholder={"Deck Title"}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={this.submit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 52,
    textAlign: "center"
  },
  button: {
    backgroundColor: black,
    borderRadius: 6,
    width: 150,
    padding: 8
  },
  buttonText: {
    color: white,
    textAlign: "center",
    fontSize: 18
  },
  buttonContainer: {
    marginTop: 32,
    justifyContent: "center",
    alignItems: "center"
  }
})
function mapStateToProps(state) {
  return { data: { ...state } }
}

function mapDispatchToProps(dispatch) {
  return { addDeck: title => dispatch(addDeckInRedux(title)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView)
