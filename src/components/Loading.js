import React from 'react';
import styled from 'styled-components/native';
import {ScreenColor, LoadingIconColor} from '../assets/styles';

const Container = styled.SafeAreaView`
  background-color: ${ScreenColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
`;

export default ({MaginTop}) => (
  <Container style={{marginTop: MaginTop}}>
    <LoadingIcon size="large" color={LoadingIconColor} />
  </Container>
);
