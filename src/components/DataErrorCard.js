import React from 'react';
import styled from 'styled-components/native';
import {} from '../assets/styles';
import DataError from '../assets/icons/dataError.svg';

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`;

const MessageText = styled.Text`
  margin-top: 20px;
  font-size: 15px;
`;

const SubMessageText = styled.Text`
  margin-top: 20px;
  font-size: 13px;
`;

export default ({message, subMessage}) => {
  return (
    <Container>
      <DataError width="160" height="160" />
      <MessageText>{message}</MessageText>
      <SubMessageText>{subMessage}</SubMessageText>
    </Container>
  );
};
