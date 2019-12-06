import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

class ButtonKey extends Component {
  onPress = () => {
    this.props.onPress?.();
  };
  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.onPress}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            color: '#f2f5f7',
          }}>
          {this.props.buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#607c9e',
    borderRadius: 5,
    margin: 2,
    borderWidth: 2,
  },
});

export default ButtonKey;
