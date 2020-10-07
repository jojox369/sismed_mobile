import React from 'react';
import styled from 'styled-components/native';
import {ScreenColor, ButtonColor} from '../../../assets/styles';

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ScreenColor};
`;

export const HeaderArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const IconArea = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 140px;
  height: 140px;
  border-radius: 100px;
`;

export const ExamName = styled.Text`
  margin-top: 20px;
  font-weight: bold;
`;

export const DetailsArea = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

export const FieldArea = styled.View`
  padding-top: 20px;
`;
