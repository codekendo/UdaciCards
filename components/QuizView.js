import {
  Text,
  View,
  Alert,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from "react-native"
import React from "react"
import { clearLocalNotification, setLocalNotification } from "../utils/api"
import FlipCard from "react-native-flip-card"

export default class QuizView extends React.Component {
  static navigationOptions = () => {
    return {
      title: `Quiz`,
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  }

  state = {
    quizViewCounter: 1,
    quizArrayIndex: 0,
    dataObject: {
      title: "JavaScript",
      questions: [
        {
          question: "Does React Native Work with Android?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    completed: false,
    questionsLength: 0,
    scoreTally: 0,
    questions: {},
    opacityValue: 0
  }

  componentDidMount() {
    this.setState(() => ({
      dataObject: this.props.navigation.state.params.dataObject,
      questionsLength: this.props.navigation.state.params.dataObject.questions
        .length,
      questions: this.props.navigation.state.params.dataObject.questions[0]
    }))
  }

  nextWithCorrect = () => {
    //check if completed

    if (this.state.questionsLength === this.state.quizViewCounter) {
      this.setState(
        () => ({
          scoreTally: (this.state.scoreTally = this.state.scoreTally + 1),
          completed: true
        }),
        this.alert
      )

      //Render Success
    } else {
      //Render Next question for quiz
      this.setState(() => ({
        scoreTally: (this.state.scoreTally = this.state.scoreTally + 1),
        quizViewCounter: (this.state.quizViewCounter =
          this.state.quizViewCounter + 1),
        quizArrayIndex: (this.state.quizArrayIndex =
          this.state.quizArrayIndex + 1),
        questions: this.state.dataObject.questions[this.state.quizArrayIndex]
      }))
    }
  }
  nextWithIncorrect = () => {
    if (this.state.questionsLength === this.state.quizViewCounter) {
      this.setState(
        () => ({
          scoreTally: (this.state.scoreTally = this.state.scoreTally - 1),
          completed: true
        }),
        this.alert
      )
    } else {
      this.setState(() => ({
        scoreTally: (this.state.scoreTally = this.state.scoreTally - 1),
        quizViewCounter: (this.state.quizViewCounter =
          this.state.quizViewCounter + 1),
        quizArrayIndex: (this.state.quizArrayIndex =
          this.state.quizArrayIndex + 1),
        questions: this.state.dataObject.questions[this.state.quizArrayIndex]
      }))
    }
  }

  restartQuiz = () => {
    clearLocalNotification().then(setLocalNotification)
    this.setState(() => ({
      completed: false,
      scoreTally: 0,
      quizViewCounter: 1,
      quizArrayIndex: 0,
      questions: this.state.dataObject.questions[0]
    }))
  }

  finalScore = () => {
    const { questionsLength, scoreTally } = this.state
    let finalTally = scoreTally
    if (scoreTally < 0) {
      finalTally = 0
    }
    const textToReturn = "Score: " + finalTally / questionsLength * 100 + "%"
    return textToReturn
  }

  backToDeck = () => {
    clearLocalNotification().then(setLocalNotification)
    this.props.navigation.goBack()
  }

  alert = () => {
    Alert.alert(
      "Completed",
      this.finalScore(),
      [
        {
          text: "Restart Quiz",
          onPress: () => this.restartQuiz()
        },
        {
          text: "Back to Deck",
          onPress: () => this.backToDeck(),
          style: "cancel"
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    const {
      quizViewCounter,
      quizArrayIndex,
      dataObject,
      questionsLength,
      questions,
      opacityValue
    } = this.state

    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 60 }}>
            {quizViewCounter}/{questionsLength}
          </Text>

          <View>
            <FlipCard
              flip={this.state.flip}
              friction={6}
              perspective={1000}
              flipHorizontal={true}
              flipVertical={false}
              clickable={true}
              style={styles.card}
              alignHeight={true}
              alignWidth={true}
            >
              {/*FrontSide*/}
              <View style={styles.face}>
                <Text style={styles.questionText}>
                  {questions.question}
                </Text>

                <Text
                  style={{
                    color: "#d4271b",
                    fontSize: 24,
                    textAlign: "center"
                  }}
                >
                  Answer
                </Text>
              </View>
              {/*BackSide*/}
              <View style={[styles.back]}>
                <Text style={styles.questionText}>
                  {dataObject.questions[this.state.quizArrayIndex].answer}
                </Text>

                <Text
                  style={{
                    color: "#d4271b",
                    fontSize: 24
                  }}
                >
                  Question
                </Text>
              </View>
            </FlipCard>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 12
            }}
          >
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#008000",
                  marginBottom: 12
                }
              ]}
            >
              <Text
                style={{ color: "#fff", textAlign: "center" }}
                onPress={this.nextWithCorrect}
              >
                Correct
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: "#d4271b"
                }
              ]}
            >
              <Text
                style={{ color: "#fff", textAlign: "center" }}
                onPress={this.nextWithIncorrect}
              >
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    borderWidth: 0
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  face: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  back: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  questionText: {
    fontSize: 32,
    textAlign: "center"
  },
  button: {
    borderRadius: 4,
    width: 150,
    padding: 8
  }
})
