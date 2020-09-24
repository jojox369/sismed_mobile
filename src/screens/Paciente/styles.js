import React from 'react';
import styled from 'styled-components/native';
import {ScreenColor, HeaderTitleColor} from '../../assets/styles';
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${ScreenColor};
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;

export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: ${HeaderTitleColor};
`;

export const SearchArea = styled.View``;

export const SearcInput = styled.TextInput``;

export const SearchButton = styled.TouchableOpacity``;
