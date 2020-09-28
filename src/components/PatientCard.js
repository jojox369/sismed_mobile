import React from 'react';
import styled from 'styled-components/native';
import {CardColor, TabBarColor, ButtonColor} from '../assets/styles';
import {Cell, CPF} from '../pipes/pipes';

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
const CellText = styled.Text`
  font-size: 13px;
  margin-top: 10px;
`;
const CpfText = styled.Text`
  font-size: 13px;
  margin-top: 10px;
`;

const SeeDetails = styled.View`
  width: 100px;
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
      <NameText>{data.nome}</NameText>
      <CellText>{Cell(data.celular)}</CellText>
      <CpfText>{CPF(data.cpf)}</CpfText>
      <SeeDetails>
        <SeeDetailsText>Ver Paciente</SeeDetailsText>
      </SeeDetails>
    </Area>
  );
};
