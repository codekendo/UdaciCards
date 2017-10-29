import React from "react"
import { connect } from "react-redux"
import { setToday } from "../utils/api"
import { setDataInRedux } from "../actions"
import {
  white,
  gray,
  black,
  container,
  titleText,
  subTitle
} from "./Stylesheet"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"

class IndividualDeckView extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { dataObject } = navigation.state.params
    return {
      title: `${dataObject.title}`
    }
  }

  handleQuizButton = () => {
    const { targetObject } = this.props
    if (targetObject.questions.length > 0) {
      this.props.navigation.navigate("QuizView", {
        dataObject: targetObject
      })
    } else alert("add cards")
  }

  render() {
    const { targetObject } = this.props
    return (
      <View>
        <View
          style={[
            container,
            {
              backgroundColor: gray,
              height: 250
            }
          ]}
        >
          <Text style={titleText}>
            {targetObject.title}
          </Text>
          <Text style={subTitle}>
            {targetObject.questions.length} Cards
          </Text>
        </View>
        <View
          style={[
            container,
            {
              backgroundColor: gray,
              height: 250
            }
          ]}
        >
          <TouchableOpacity
            style={styles.whiteButton}
            onPress={() => {
              this.props.navigation.navigate("NewQuestionView", {
                title: targetObject.title,
                questions: targetObject.questions
              })
            }}
          >
            <Text> Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blackButton}
            onPress={this.handleQuizButton}
          >
            <Text style={{ color: white }}> Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  whiteButton: {
    backgroundColor: white,
    borderRadius: 7,
    borderColor: black,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    height: 45,
    margin: 10
  },
  blackButton: {
    backgroundColor: black,
    borderRadius: 7,
    borderColor: black,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    height: 45
  }
})

const objectToArray = object => {
  return Object.keys(object).map(idString => object[idString])
}

function mapStateToProps(state, { navigation }) {
  return {
    data: { ...state },
    targetObject: objectToArray({ ...state }).find(element => {
      return element.title === navigation.state.params.dataObject.title
    })
  }
}

export default connect(mapStateToProps)(IndividualDeckView)
