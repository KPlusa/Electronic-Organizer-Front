import React, {useState, useContext} from 'react';
import {Input as RNEInput, ThemeContext} from 'react-native-elements';
import {theme} from '../themes/theme';

const Input = props => {
  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    setFocused(true);
    props.onFocus();
  };

  const onBlur = () => {
    setFocused(false);
    props.onBlur();
  };

  const inputContainerStyle = {
    ...props.inputContainerStyle,
    ...(focused ? {borderBottomWidth: 3, borderColor: theme.colors.mainColor} : {borderColor: theme.colors.secondColor,}),
    
  };

  const placeholderTextColor = focused ? theme.colors.mainColor : theme.colors.secondColor;
  const style = {
    ...props.style,
  };

  const ref = 
    props.refs;

  const labelStyle = {
    ...props.labelStyle,
    ...(focused ? {color: theme.colors.mainColor} : {}),
  };

  const leftIcon = {
    ...props.leftIcon,
    ...(focused ? {color: theme.colors.mainColor} : {color: theme.colors.secondColor}),
  };

  let rightIcon = {
    ...props.rightIcon,
    ...(focused ? {color: theme.colors.mainColor} : {color: theme.colors.secondColor}),
  };

  return (
    <RNEInput
      {...props}
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
      inputContainerStyle={inputContainerStyle}
      labelStyle={labelStyle}
      placeholderTextColor={placeholderTextColor}
      leftIcon={leftIcon}
      ref={ref}
    />
  );
};

Input.defaultProps = {
  onFocus: () => null,
  onBlur: () => null,
  inputContainerStyle: {},
  style: {},
  leftIcon: {},
  rightIcon: {},
  labelStyle: {},
  ref: null
};

export default Input;
