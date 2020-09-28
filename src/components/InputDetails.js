import React from 'react';
import styled from 'styled-components/native';

import {InputColor} from '../assets/styles';

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${InputColor};
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const TextArea = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const DataText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export default ({Icon, data}) => {
  return (
    <InputArea>
      <Icon width="24" height="24" fill="#000" />
      <TextArea>
        <DataText>{data}</DataText>
      </TextArea>
    </InputArea>
  );
};
