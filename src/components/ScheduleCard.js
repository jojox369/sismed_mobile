import React from 'react';
import styled from 'styled-components/native';
import {CardColor, TabBarColor, ButtonColor} from '../assets/styles';

const Area = styled.TouchableOpacity`
  background-color: ${CardColor};
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 15px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;
const SchedulingText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-top: 10px;
`;
const ProceedingText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-top: 10px;
`;

const SeeDetails = styled.View`
  width: 120px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid ${TabBarColor};
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const SeeDetailsText = styled.Text`
  font-size: 13px;
  color: ${ButtonColor};
`;

export default ({data, onPress}) => {
  return (
    <Area onPress={onPress}>
      <NameText>{data.paciente.nome}</NameText>
      <SchedulingText>{data.hora}</SchedulingText>
      <ProceedingText>{data.procedimento.descricao}</ProceedingText>
      <SeeDetails>
        <SeeDetailsText>Ver Agendamento</SeeDetailsText>
      </SeeDetails>
    </Area>
  );
};
