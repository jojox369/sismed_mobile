import React, {useState} from 'react';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';
import UserIcon from '../assets/icons/user.svg';
import ShowPasswordIcon from '../assets/icons/showPassword.svg';
import {View, TouchableHighlight} from 'react-native';

/* Area do campo */
const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #fff;
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  margin-bottom: 15px;
`;
const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
`;

export const SignInput = ({
  IconSvg,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  password,
}) => {
  const [hidePassword, setHidePassword] = useState(password);

  if (password) {
    return (
      <InputArea>
        <IconSvg width="24" height="24" fill="#000" />
        <Input
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidePassword}
        />
        <ShowPasswordIcon
          width="24"
          height="24"
          fill="#000"
          onPress={() => {
            hidePassword ? setHidePassword(false) : setHidePassword(true);
          }}
        />
      </InputArea>
    );
  } else {
    return (
      <InputArea>
        <IconSvg width="24" height="24" fill="#000" />
        <Input
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
        />
      </InputArea>
    );
  }
};
