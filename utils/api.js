/*
Thanks Tyler McGinnis for the code for the Notifications
*/
import { AsyncStorage } from "react-native"
import { Notifications, Permissions } from "expo"

const QUIZ_KEY = "quizData"
const NOTIFICATION_KEY = "NOTIFICATION_KEY_For_UdaciCards"

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  )
}

function createNotification() {
  return {
    title: "Review Cards",
    body: "⏰ Don't forget to review cards for today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then(data => {
    if (data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === "granted") {
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate() + 1)
          tomorrow.setHours(20)
          tomorrow.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: tomorrow,
            repeat: "day"
          })

          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        }
      })
    }
  })
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
