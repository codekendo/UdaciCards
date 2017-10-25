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
import { getQuizData, getTimeStamp } from "../utils/api"
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
      .then(() => getTimeStamp())
      .then(date => JSON.parse(date))
      .then(date =>
        this.setState(() => ({
          date: date
        }))
      )
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ item }) => {
    const targetObject = this.props.data[item]
    const { title, questions } = targetObject
    return (
      <TouchableOpacity
        style={[styles.mainContainer, styles.container]}
        onPress={() =>
          this.props.navigation.navigate("IndividualDeckView", {
            dataObject: targetObject
          })}
      >
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.subTitle}>
          {questions.length + " cards"}
        </Text>
      </TouchableOpacity>
    )
  }

  checkDate = () => {
    const { date } = this.state
    const dateBefore = new Date(date)
    const dateNow = new Date()
    var hours = Math.round(Math.abs(dateBefore - dateNow) / 36e5)

    if (hours > 23) {
      alert("Please complete a review of one of the decks")
    }
  }
  render() {
    const { ready } = this.state
    const { data } = this.props
    if (ready === false) {
      return <AppLoading />
    }
    if (ready === true) {
      this.checkDate()
    }

    // const date = new Date()
    // const calcDifferenceBetweenDates = Math.abs(getTimeStamp.getTime()-date.getTime())/36e5;
    //     if(calcDifferenceBetweenDates > 24){
    //       alert('hello')
    //     }
    return (
      <View style={styles.container}>
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
    borderColor: "#222",
    borderBottomWidth: 1,
    flex: 1,
    flexWrap: "wrap"
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 32,
    color: "#222"
  },
  subTitle: {
    color: "#747474",
    fontSize: 18
  }
})

function mapStateToProps(state) {
  return { data: { ...state } }
}

function mapDispatchToProps(dispatch) {
  return { setData: data => dispatch(setDataInRedux(data)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeckListView)
