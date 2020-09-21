import React, { Component } from 'react';
import styled from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';
import UserIcon from '../assets/user.svg';
import { View } from 'react-native';
/* Area do campo */
const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: #FFF;
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;
const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
`;

export const CPFInput = ({ IconSvg, placeholder, keyboardType, value, onChangeText, ref }) => {
  const cpfField = ""
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#000" />
      <View style={{ marginLeft: 10, flex: 1, }} >
        <TextInputMask
          mask={"[000].[000].[000]-[00]"}
          value={value}
          ref={ref}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          keyboardType={"numeric"}
        />
      </View>
    </InputArea>
  );
}

export const PasswordInput = ({ IconSvg, placeholder, keyboardType, value, onChangeText, password }) => {
  return (
    <InputArea>
      <IconSvg width="24" height="24" fill="#000" />
      <Input
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
}

