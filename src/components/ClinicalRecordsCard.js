import React from 'react';
import styled from 'styled-components/native';
import {CardColor, TabBarColor, ButtonColor} from '../assets/styles';

const Area = styled.TouchableOpacity`
  background-color: ${CardColor};
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const DataText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
`;
const TimeText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  margin-top: 10px;
`;

const RecordText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-top: 10px;
`;

export default ({data, onPress}) => {
  return (
    <Area onPress={onPress}>
      <DataText>{data.data}</DataText>
      <TimeText>{data.hora}</TimeText>
      <RecordText>{data.descricao}</RecordText>
    </Area>
  );
};
