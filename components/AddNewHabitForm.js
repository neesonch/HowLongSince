import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native';
import {getCurrentUnixTime} from '../utils.js';

class AddNewHabitForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      slideAnim: new Animated.Value(0),
      formHeight: -1,
      viewportDimensions: Dimensions.get('window'),
      text: '',
      isGoodHabit: true,
      lastTimestamp: null,
    };
  }

  onPress = () => {
    this.setState({ open: !this.state.open }, () => {
      // Animate form slide-up/down
      Animated.timing(this.state.slideAnim, {
        toValue: this.state.open ? -this.state.formHeight : 0,
        duration: 500,
      }).start();
    });
  };

  // Measure and set height of form
  handleLayout = e => {
    if (this.state.formHeight === -1) {
      this.setState({ formHeight: e.nativeEvent.layout.height });
    }
  };

  // Toggle a boolean field in state
  toggleState = fieldName => {
    const newValue = !this.state[fieldName];
    this.setState({ [fieldName]: newValue });
  };

  handleSubmitForm = () => {
    //alert(`Title: ${this.state.text} Current timestamp: ${getCurrentUnixTime()} Good Habit: ${this.state.isGoodHabit}`);
    this.props.handleAddNewHabit(this.state.text, getCurrentUnixTime(), this.state.isGoodHabit);
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
  }

  componentDidUpdate() {
    console.log(this.state.text); //DEBUG
  }

  _keyboardDidShow() {
    console.log('Keyboard in da house'); //DEBUG
  }

  render() {
    let heightValue = this.state.slideAnim;
    const styles = StyleSheet.create({
      button: {
        backgroundColor: `grey`,
        padding: 20,
        width: this.state.viewportDimensions.width,
        alignItems: `center`,
      },
      text: { height: 50, backgroundColor: `pink`, textAlign: `center`, },
      view: {
        position: `absolute`,
        left: 0,
        right: 0,
      },
    });

    return (
      <Animated.View
        style={(styles.view, { top: heightValue })}
        onLayout={this.handleLayout}
      >
        <TouchableHighlight
          activeOpacity={1}
          style={styles.button}
          onPress={this.onPress}
        >
          <Text> Hello I am add new habit </Text>
        </TouchableHighlight>
        <TextInput
          style={styles.text}
          onChangeText={text => this.setState({ text })}
        />
        <TouchableHighlight
          activeOpacity={1}
          onPress={() => this.toggleState('isGoodHabit')}
        >
          <Text style={styles.text}>{String(this.state.isGoodHabit)}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          onPress={this.handleSubmitForm}
          style={styles.button}
          >
          <Text>Submit</Text>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

export default AddNewHabitForm;
