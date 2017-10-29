import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import React from "react"
import { connect } from "react-redux"
import { black, white } from "./Stylesheet"
import { submitQuestion } from "../utils/api"
import { addQuestionInRedux } from "../actions"

class NewQuestionView extends React.Component {
  state = {
    question: "",
    questions: [],
    answer: this.props.answer,
    title: this.props.title
  }

  submit = () => {
    const { question, answer, title, questions } = this.state
    const modifiedQuestions = [
      ...questions,
      { question: question, answer: answer }
    ]

    submitQuestion(modifiedQuestions, title)
      .then(this.props.addQuestion(modifiedQuestions, title))
      .then(() => this.props.navigation.goBack())
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder={"Question"}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />

        <TextInput
          style={{ height: 48, borderColor: "gray", borderWidth: 2 }}
          placeholder={"Answer"}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />

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
  container: {
    padding: 16
  },
  textInput: {
    height: 48,
    borderColor: "gray",
    borderWidth: 2,
    marginBottom: 16
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

function mapStateToProps(state, { navigation }) {
  return {
    data: { ...state },
    title: navigation.state.params.title
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addQuestion: (questions, title) =>
      dispatch(addQuestionInRedux(questions, title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewQuestionView)
