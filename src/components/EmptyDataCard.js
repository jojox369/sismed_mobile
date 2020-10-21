import React from 'react';
import styled from 'styled-components/native';
import {EmptyTextColor, EmptySubTextColor} from '../assets/styles';
import BrokenHeart from '../assets/icons/brokenHeart.svg';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`;

const MessageText = styled.Text`
  margin-top: 20px;
  font-size: 15px;
  color: ${EmptyTextColor};
`;

const SubMessageText = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  color: ${EmptySubTextColor};
`;

export default ({message, subMessage}) => {
  return (
    <Container>
      <BrokenHeart width="160" height="160" />
      <MessageText>{message}</MessageText>
      <SubMessageText>{subMessage}</SubMessageText>
    </Container>
  );
};
