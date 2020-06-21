import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { convertTimestampToTimer } from "../utils";

export default class HabitListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: convertTimestampToTimer(this.props.item.lastTimestamp)
    };
  }

  componentDidMount() {
    this.interval = setInterval(
      () =>
        this.setState({
          elapsedTime: convertTimestampToTimer(this.props.item.lastTimestamp)
        }),
      1000
    );
    console.log(`List item props`);
    console.log(this.props);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const item = this.props.item;
    const elapsedTime = this.state.elapsedTime;
    return (
      <View style={styles.timestampListItem}>
        <Text style={styles.timestampListItemText}>{item.title}</Text>
        <Text>
          Time: {elapsedTime.timerYears}y {elapsedTime.timerDays}d{" "}
          {elapsedTime.timerHours}h {elapsedTime.timerMinutes}m{" "}
          {elapsedTime.timerSeconds}s
        </Text>
        <Button
          onPress={() => this.props.handleDeleteItem(item.id)}
          colour="#841584"
          title="Delete"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timestampListItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000000",
    alignItems: "stretch",
    justifyContent: "center",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginBottom: 10,
    height: 100
  },
  timestampListItemText: {
    textAlign: "center"
  }
});
