import { SET_DATA, ADD_DECK, ADD_QUESTION } from "../actions"

const initialState = {
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

function reducer(state = {}, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.data
      }
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, ...action.questions]
        }
      }
    default:
      return state
  }
}

export default reducer
