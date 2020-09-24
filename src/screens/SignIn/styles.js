import React from 'react';
import styled from 'styled-components/native';
import {ScreenColor, ButtonColor, ButtonTextColor} from '../../assets/styles';
export const Container = styled.SafeAreaView`
  background-color: ${ScreenColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputArea = styled.View`
  width: 100%;
  padding: 40px;
`;

export const CustomButtom = styled.TouchableOpacity`
  height: 60px
  background-color: ${ButtonColor};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
export const CustomButtomText = styled.Text`
  font-size: 18px;
  color: ${ButtonTextColor};
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;
export const ForgotPasswordButtonText = styled.Text`
  font-size: 16px;
  color: blue;
`;
