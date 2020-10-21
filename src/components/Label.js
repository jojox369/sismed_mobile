import React from 'react';
import styled from 'styled-components/native';

import {LabelColor} from '../assets/styles';

const LabelArea = styled.View``;

export const Label = styled.Text`
  margin-left: 20px;
  font-size: 14px;
  font-weight: bold;
  color: ${LabelColor};
`;

export default ({label}) => {
  return (
    <LabelArea>
      <Label>{label}</Label>
    </LabelArea>
  );
};
