import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import ButtonKey from './ButtonKey';

class KeyBoard extends Component {
  onPress = value => {
    //console.log(`_____ KeyBoard, pressed key ${value}`);
    this.props.onPress?.(value);
  };
  render() {
    return (
      // render keyboard
      <View style={styles.KeyBoardFrame}>{
        keyBoardText.map((rowKey, rowIdx) => (
          <View key={rowIdx} style={styles.KeyRow}>{
            rowKey.map((columKey, columnIdx) => (
              <View key={columnIdx} style={styles.KeyColumn, {flex: flexKey[rowIdx][columnIdx]}}>{
                <ButtonKey  buttonText={columKey} onPress={() => this.onPress(columKey)} />
              }
              </View>
            ))
          }
          </View>
        ))
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  KeyBoardFrame: {
    flex: 1,
    flexDirection: 'column',
  },

  KeyRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#eba713',
  },

  KeyColumn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
});

const keyBoardText = [
  ['C', '(', ')', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

const flexKey = [
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [2, 1, 1],
];
  
export default KeyBoard;
