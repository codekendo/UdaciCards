import QuizView from "./QuizView"
import NewDeckView from "./NewDeckView"
import DeckListView from "./DeckListView"
import NewQuestionView from "./NewQuestionView"
import IndividualDeckView from "./IndividualDeckView"
import { TabNavigator, StackNavigator } from "react-navigation"

export const Tabs = TabNavigator(
  {
    Decks: {
      screen: DeckListView
    },
    "New Deck": {
      screen: NewDeckView
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: "#222",
      style: {
        backgroundColor: "#fff"
      }
    }
  }
) //EndofNavigagor

export const Stack = StackNavigator({
  Home: {
    screen: Tabs
  },
  IndividualDeckView: {
    screen: IndividualDeckView,
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: {
      title: "Add Card",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#222"
      }
    }
  }
})
