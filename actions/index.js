export const SET_DATA = "SET_DATA"
export const ADD_DECK = "ADD_DECK"
export const ADD_QUESTION = "ADD_QUESTION"

export function setDataInRedux(data) {
  return {
    type: SET_DATA,
    data
  }
}

export function addDeckInRedux(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function addQuestionInRedux(questions, title) {
  return {
    type: ADD_QUESTION,
    title,
    questions
  }
}
