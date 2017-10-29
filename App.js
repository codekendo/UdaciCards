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
import { Stack } from "./components/Navigation"
import { clear, setLocalNotification } from "./utils/api"
import { white } from "./components/Stylesheet"

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
              backgroundColor: white,
              height: Constants.statusBarHeight
            }}
          >
            <StatusBar
              translucent
              backgroundColor={white}
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
