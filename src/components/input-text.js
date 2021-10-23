import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';

class TxtInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {},
    };
  }

  onFocus = () => {
    const state = { ...this.state };
    state.style = {
      borderStyle: 'solid',
      borderColor: '#e74712',
    };

    this.setState(state);
  }

  onBlur = () => {
    console.log('on ONBLUR')
    const state = { ...this.state };
    state.style = {};

    this.setState(state);
  }

  render = () => <TextInput style={[styles.input, this.state.style]} onFocus={() => this.onFocus()} onBlur={() => this.onBlur()} />;
}

const styles = StyleSheet.create({
  input: {
    fontSize: 22,
    borderRadius: 34,
    borderStyle: 'solid',
    textAlign: 'center',
    width: '25%',
 },
});

export default TxtInput;