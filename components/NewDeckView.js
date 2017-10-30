import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import {
  white,
  black,
  buttonText,
  blackButton,
  buttonContainer
} from "./Stylesheet"
import React from "react"
import { connect } from "react-redux"
import { addDeckInRedux } from "../actions"
import { submitNewDeckTitle } from "../utils/api"

class NewDeckView extends React.Component {
  state = {
    title: ""
  }

  check = title => {
    if (this.props.data[title] || title === "") {
      return false
    } else {
      return true
    }
  }

  submit = () => {
    const { title } = this.state
    if (this.check(title)) {
      submitNewDeckTitle(title).then(() => this.props.addDeck(title)).then(() =>
        this.props.navigation.navigate("IndividualDeckView", {
          dataObject: {
            title: title,
            questions: []
          }
        })
      )
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
        <View style={[buttonContainer]}>
          <TouchableOpacity style={[blackButton]} onPress={this.submit}>
            <Text style={[buttonText]}>Submit</Text>
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
  }
})
function mapStateToProps(state) {
  return { data: { ...state } }
}

function mapDispatchToProps(dispatch) {
  return { addDeck: title => dispatch(addDeckInRedux(title)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewDeckView)
