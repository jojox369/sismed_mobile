import React, {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Api from '../../../services/patient';
import {Cell, CPF, BrazilianDate} from '../../../pipes/pipes';
import InputDetails from '../../../components/InputDetails';
import LoadingComponent from '../../../components/Loading';
import LabelComponent from '../../../components/Label';
import UserIcon from '../../../assets/icons/user.svg';
import ProntuarioIcon from '../../../assets/icons/prontuarioMedico.svg';
import CpfIcon from '../../../assets/icons/cpf.svg';
import AgeIcon from '../../../assets/icons/calendar.svg';
import CellIcon from '../../../assets/icons/smartphone.svg';
import MedicalRecordsIcon from '../../../assets/icons/medicalRecords.svg';
import ExamsIcon from '../../../assets/icons/exam.svg';
import {showMessage} from 'react-native-flash-message';
import DataErrorCard from '../../../components/DataErrorCard';
import {ButtonIconColor} from '../../../assets/styles';
import {UserContext} from '../../../contexts/UserContext';

import {
  Container,
  HeaderArea,
  IconArea,
  PatientName,
  DetailsArea,
  FieldArea,
  Scroller,
  ButtonsArea,
  ExamsButton,
  ClinicalRecordButton,
  ButtonsText,
  EmployeeExamButton,
} from './styles';

export default ({route}) => {
  const navigation = useNavigation();
  const [patient, setPatient] = useState({});
  const [loading, setLoading] = useState(false);
  const {id} = route.params;
  const [dataError, setDataError] = useState(false);
  const {state} = useContext(UserContext);

  const getData = async () => {
    setLoading(true);
    let response = await Api.getById(id);

    if (response != 'error') {
      setLoading(false);
      response.cpf = CPF(response.cpf);
      response.celular = Cell(response.celular);
      response.data_nascimento = BrazilianDate(response.data_nascimento);
      setPatient(response);
    } else {
      setloading(false);
      showMessage({
        message: 'Erro ao tentar listar',
        type: 'danger',
        icon: 'danger',
      });
      setDataError(true);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      {dataError && (
        <DataErrorCard
          message="Ocorreu um erro ao tentar listar as informações"
          subMessage="Arraste para baixo para baixo para atualizar a tela"
        />
      )}
      {!loading && !dataError && (
        <Scroller>
          <HeaderArea>
            <IconArea>
              <UserIcon width="100" height="100" fill="#000000" />
            </IconArea>

            <PatientName>{patient.nome}</PatientName>
          </HeaderArea>

          <DetailsArea>
            <FieldArea>
              <LabelComponent label="Prontuario" />
              <InputDetails Icon={ProntuarioIcon} data={patient.prontuario} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="CPF" />
              <InputDetails Icon={CpfIcon} data={patient.cpf} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Celular" />
              <InputDetails Icon={CellIcon} data={patient.celular} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Data de Nascimento" />
              <InputDetails Icon={AgeIcon} data={patient.data_nascimento} />
            </FieldArea>
            <ButtonsArea>
              {state.perfil !== 2 && (
                <ExamsButton
                  onPress={() => {
                    navigation.navigate('PatientExams', {
                      name: patient.nome,
                    });
                  }}>
                  <ExamsIcon width="25" height="25" fill={ButtonIconColor} />
                  <ButtonsText>Exames</ButtonsText>
                </ExamsButton>
              )}

              {state.perfil !== 2 && (
                <ClinicalRecordButton
                  onPress={() => {
                    navigation.navigate('ClinicalRecords', {
                      id: patient.id,
                      name: patient.nome,
                    });
                  }}>
                  <MedicalRecordsIcon
                    width="25"
                    height="25"
                    fill={ButtonIconColor}
                  />
                  <ButtonsText> Reg.Clínicos </ButtonsText>
                </ClinicalRecordButton>
              )}
              {state.perfil === 2 && (
                <EmployeeExamButton>
                  <ExamsIcon width="25" height="25" fill={ButtonIconColor} />
                  <ButtonsText>Exames</ButtonsText>
                </EmployeeExamButton>
              )}
            </ButtonsArea>
          </DetailsArea>
        </Scroller>
      )}
      {loading && <LoadingComponent />}
    </Container>
  );
};
