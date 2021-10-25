import React, {useState, useContext} from 'react';
import {Input as RNEInput, ThemeContext} from 'react-native-elements';
import {theme} from '../themes/theme';

const Inputt = props => {
  const [focused, setFocused] = useState(false);
  const mainColor = theme.colors.mainColor;
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
    ...(focused ? {borderBottomWidth: 3} : {}),
    borderColor: theme.colors.mainColor,
  };

  const placeholderTextColor = 
    (focused ? mainColor : "gray")
  ;

  const style = {
    ...props.style,
  };

  const labelStyle = {
    ...props.labelStyle,
    ...(focused ? {color: theme.colors.mainColor} : {}),
  };

  const leftIcon = {
    ...props.leftIcon,
    ...(focused ? {color: theme.colors.mainColor} : {}),
  };

  let rightIcon = {
    ...props.rightIcon,
    ...(focused ? {color: theme.colors.mainColor} : {}),
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
      
      
    />
  );
};

Inputt.defaultProps = {
  onFocus: () => null,
  onBlur: () => null,
  inputContainerStyle: {},
  style: {},
  leftIcon: {},
  rightIcon: {},
  labelStyle: {},
};

export default Inputt;
