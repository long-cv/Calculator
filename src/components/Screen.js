/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import KeyBoard from './KeyBoard';

class Screen extends Component {
  constructor(props){
    super(props);
    this.state = {
      txtExpression: '',
      txtResult: '',
    };
  }

  // check a operater
  isOperator = str => {
      return str.match(/\+|\-|\*|\//g);
  }
  // check a operand
  isOperand = str => {
    return str.match(/^\d+$|^\d+\.\d+$/g);
  }
  // get priority of a operator
  getPriority = op => {
    if ((op === '*') || (op === '/')) return 2
    else if ((op === '+') || (op === '-')) return 1
    else return 0;
  }
  /* 
    using Polish Reverse Notation to convert Infix to Postfix
    @input: infix expression
    @return: Postfix expression
    @param: strExp
  */
  convertInfix2Postfix = strExp => {
    try {
      let arrExpression = strExp.split(/(\+|\-|\*|\/|\)|\()/g);
      console.log(arrExpression);
      let operatorStack = [];
      let strPostfix = [];
      for (let value of arrExpression) {
        //case split method return array contains empty string when separator appears at the beginning or end of string
        if (value === '') continue;

        if (this.isOperand(value)) {
          strPostfix.push(value);
        } else if (value === '(') {
          operatorStack.push(value);
        } else if (value === ')') {
          let op = operatorStack.pop();
          while ((op) && op !== '(')
          {
            strPostfix.push(op);
            op = operatorStack.pop();
          }
        } else if (this.isOperator(value)) {
          if (operatorStack.length > 0 && this.getPriority(operatorStack[operatorStack.length - 1]) >= this.getPriority(value))
            strPostfix.push(operatorStack.pop());
          operatorStack.push(value);
        }
      }
      while (operatorStack.length > 0)
        strPostfix.push(operatorStack.pop());
      console.log(strPostfix);
      return strPostfix;
    } catch (error) {
     return '';
    }
    
  }
  /* 
    evaluate the postfix expression using a stack
    @input: postfix expression
    @return: result of expression
    @param: expr
  */
  evaluatePostfix = expr => {
    try {
      let stack = [];
      for (let value of expr) {
        if (this.isOperator(value)) {
          let x = stack.pop();
          let y = stack.pop();
          switch (value) {
            case '+': y += x; break;
            case '-': y -= x; break;
            case '*': y *= x; break;
            case '/': y /= x; break;
          }
          stack.push(y);
        } else if (this.isOperand(value)) {
          stack.push(parseFloat(value));
        }
      }
      return stack.pop().toString();
    } catch (error) {
      return 'error!!!';
    }
      
  }
  // handling press keyboard
  onPress = value => {
    //console.log(`_____ Screen, pressed key ${value}`);
    if (value === '=') {
      if (this.state.txtExpression === '') return;
       //let result: eval(this.state.txtExpression);
      let result = this.evaluatePostfix(this.convertInfix2Postfix(this.state.txtExpression));
      this.setState({
        txtResult: result,
      });
    } else if (value === 'C') {
      this.setState({
        txtResult: '',
        txtExpression: '',
      });
    } else {
      let exp = this.state.txtExpression;
      if (this.isOperator(value)) {
        if (exp !== '') {
          let lastChar = exp.slice(-1);
          if (this.isOperator(lastChar)) exp = exp.replace(/.$/, value);
          else exp = exp.concat(value);
        }
      } else {
        exp = exp.concat(value);
      }
      this.setState({
        txtExpression: exp,
      });
    }
  }

  render() {
    return (
      <View style={styles.CalcScreen}>
        <Text style={styles.RowOne}>{this.state.txtExpression}</Text>
        <Text style={styles.RowTwo}>{this.state.txtResult}</Text>
        <View style={styles.RowThree}>
          <KeyBoard onPress={this.onPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  CalcScreen: {
    flex: 1,
  },
  // Expression
  RowOne: {
    flex: 1,
    backgroundColor: '#f2fafa',
    borderWidth: 2,
    color: '#fc0317',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'right',
    textAlignVertical: 'bottom',
    paddingRight: 15,
  },
  // Result
  RowTwo: {
    flex: 1,
    backgroundColor: '#f2fafa',
    borderWidth: 2,
    color: '#fc0317',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right',
    textAlignVertical: 'center',
    textDecorationLine: 'underline',
    paddingRight: 15,
  },
  // KeyBoard
  RowThree: {
    flex: 5,
    backgroundColor: '#eba713',
  },
});

export default Screen;
