import { AsyncStorage } from "react-native"

const QUIZ_KEY = "quizData"
const NOTIFICATION_KEY = "NOTIFICATION_KEY_For_UdaciCards"

export function getTimeStamp() {
  return AsyncStorage.getItem(NOTIFICATION_KEY).then(res => setDate(res))
}

function setDate(res) {
  return res === null ? setDummyDate() : setToday().then(() => date)
}

function setDummyDate() {
  var date = new Date()
  date.setDate(date.getDate() - 1)
  const stringDate = JSON.stringify(date)

  return AsyncStorage.setItem(NOTIFICATION_KEY, stringDate).then(
    () => stringDate
  )
}

export function setToday() {
  var date = new Date()
  const stringDate = JSON.stringify(date)

  return AsyncStorage.setItem(NOTIFICATION_KEY, stringDate).then(
    () => stringDate
  )
}

const data = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
}
export function clear() {
  return AsyncStorage.clear()
}
export function getQuizData() {
  return AsyncStorage.getItem(QUIZ_KEY).then(res => setOrFormat(res))
}

function formatResponse(res) {
  return JSON.parse(res)
}

function setOrFormat(res) {
  return res === null ? setDummyData() : formatResponse(res)
}

function setDummyData() {
  AsyncStorage.setItem("quizData", JSON.stringify(data))
  return data
}

export function submitNewDeckTitle(title) {
  return getQuizData().then(data => {
    return AsyncStorage.mergeItem(
      QUIZ_KEY,
      JSON.stringify({
        [title]: {
          title: title,
          questions: []
        }
      })
    )
  })
}

export function submitQuestion(modifiedQuestions, title) {
  return getQuizData().then(data => {
    if (data) {
      return AsyncStorage.mergeItem(
        QUIZ_KEY,
        JSON.stringify({
          [title]: {
            title: title,
            questions: modifiedQuestions
          }
        })
      )
    }
  })
}
