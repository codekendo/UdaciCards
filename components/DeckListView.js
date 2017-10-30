import {
  gray,
  white,
  black,
  subTitle,
  titleText,
  container
} from "./Stylesheet"
import {
  Text,
  View,
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native"
import React from "react"
import { AppLoading } from "expo"
import { connect } from "react-redux"
import { getQuizData } from "../utils/api"
import { setDataInRedux } from "../actions"

class DeckListView extends React.Component {
  state = {
    data: {},
    date: "",
    ready: false
  }
  componentDidMount() {
    getQuizData()
      .then(data => this.props.setData(data))
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ item }) => {
    const targetObject = this.props.data[item]
    const { title, questions } = targetObject
    return (
      <TouchableOpacity
        style={[styles.mainContainer, container]}
        onPress={() =>
          this.props.navigation.navigate("IndividualDeckView", {
            dataObject: targetObject
          })}
      >
        <Text style={[titleText]}>
          {title}
        </Text>
        <Text style={[subTitle]}>
          {questions.length + " cards"}
        </Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { ready } = this.state
    const { data } = this.props
    if (ready === false) {
      return <AppLoading />
    }
    if (ready === true) {
    }

    return (
      <View style={[container]}>
        <FlatList
          data={Object.keys(data)}
          renderItem={this.renderItem}
          keyExtractor={item => item}
        />
      </View>
    ) //EndofReturn
  } //EndofRender
} //EndofClass

const styles = StyleSheet.create({
  mainContainer: {
    padding: 48,
    width: 359,
    borderColor: black,
    borderBottomWidth: 1,
    flex: 1,
    flexWrap: "wrap"
  }
})

function mapStateToProps(state) {
  return { data: { ...state } }
}

function mapDispatchToProps(dispatch) {
  return { setData: data => dispatch(setDataInRedux(data)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
