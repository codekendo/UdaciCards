import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import React from "react"
import reducer from "./reducers"
import { Constants } from "expo"
import { createStore } from "redux"
import { Provider } from "react-redux"
import QuizView from "./components/QuizView"
import NewDeckView from "./components/NewDeckView"
import DeckListView from "./components/DeckListView"
import { clear, setLocalNotification } from "./utils/api"
import NewQuestionView from "./components/NewQuestionView"
import { TabNavigator, StackNavigator } from "react-navigation"
import IndividualDeckView from "./components/IndividualDeckView"

const Tabs = TabNavigator(
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

const Stack = StackNavigator({
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

export default class App extends React.Component {
  componentDidMount() {
    clear()
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "#fff",
              height: Constants.statusBarHeight
            }}
          >
            <StatusBar
              translucent
              backgroundColor={"#fff"}
              barStyle="light-content"
            />
          </View>
          <Stack />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
