import React from 'react';
import styled from 'styled-components/native';
import {CardColor, TabBarColor, ButtonColor} from '../assets/styles';
import {BrazilianDate} from '../pipes/pipes';

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
  font-size: 13px;
  font-weight: bold;
  margin-top: 5px;
`;

const Date = styled.Text`
  font-size: 13px;
  margin-top: 10px;
  font-weight: bold;
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
  font-weight: bold;
  color: ${ButtonColor};
`;

const PatientName = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

export default ({data, onPress}) => {
  return (
    <Area onPress={onPress}>
      <PatientName>{data.paciente.nome}</PatientName>
      <NameText>Exame: {data.nome}</NameText>
      <Date>Coleta: {BrazilianDate(data.data_coleta)}</Date>
      <Date>Envio: {BrazilianDate(data.data_envio)}</Date>
      <Date>
        Retorno:
        {data.data_retorno ? BrazilianDate(data.data_retorno) : ' PENDENTE'}
      </Date>
      <SeeDetails>
        <SeeDetailsText>Ver Exame</SeeDetailsText>
      </SeeDetails>
    </Area>
  );
};
