import React from "react"
import { connect } from "react-redux"
import { setToday } from "../utils/api"
import { setDataInRedux } from "../actions"
import { white, gray, black } from "./Stylesheet"
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
        <View style={styles.container}>
          <Text style={styles.title}>
            {targetObject.title}
          </Text>
          <Text style={styles.subTitle}>
            {targetObject.questions.length} Cards
          </Text>
        </View>
        <View style={[styles.container]}>
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
            <Text style={styles.whiteText}> Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: gray,
    justifyContent: "center",
    height: 250
  },
  title: {
    fontSize: 32
  },
  subTitle: {
    color: "#747474",
    fontSize: 18
  },
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
  },
  whiteText: {
    color: white
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
