import React from 'react';
import styled from 'styled-components/native';
import {ScreenColor} from '../../assets/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ScreenColor};
`;

export const HeaderArea = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  margin-top: 20px;
  color: #000000;
`;
