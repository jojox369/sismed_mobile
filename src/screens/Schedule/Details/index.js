import React, {useEffect, useState, useContext} from 'react';
import Api from '../../../services/schedule';
import InputDetails from '../../../components/InputDetails';
import LoadingComponent from '../../../components/Loading';
import LabelComponent from '../../../components/Label';
import {UserContext} from '../../../contexts/UserContext';

import PatientIcon from '../../../assets/icons/patient.svg';
import SchedulingIcon from '../../../assets/icons/scheduling.svg';
import MedicalRecordsIcon from '../../../assets/icons/medicalRecords.svg';
import ClockIcon from '../../../assets/icons/clock.svg';
import MedicalPrescription from '../../../assets/icons/medicalPrescription.svg';

import {showMessage} from 'react-native-flash-message';
import DataErrorCard from '../../../components/DataErrorCard';
import {ButtonIconColor} from '../../../assets/styles/';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  HeaderArea,
  IconArea,
  ScheduleProceeding,
  DetailsArea,
  FieldArea,
  Scroller,
  ClinicalRecordButton,
  ButtonText,
  ButtonArea,
} from './styles';

import CalendarIcon from '../../../assets/icons/calendar.svg';
import {BrazilianDate} from '../../../pipes/pipes';

export default ({route}) => {
  const navigation = useNavigation();
  const {id, name} = route.params;
  const {state} = useContext(UserContext);
  const [scheduling, setScheduling] = useState({});
  const [loading, setLoading] = useState();
  const [dataError, setDataError] = useState(false);

  const getData = async () => {
    setLoading(true);
    let response = await Api.getById(state.id, id);

    if (response != 'error') {
      setLoading(false);
      const formatHour = response.hora.split(':', 2);
      response.hora = formatHour[0] + ':' + formatHour[1];
      response.data = BrazilianDate(response.data);
      setScheduling(response);
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
      {!loading && (
        <Scroller>
          <HeaderArea>
            <IconArea>
              <SchedulingIcon width="100" height="100" fill="#000000" />
            </IconArea>

            <ScheduleProceeding>{name}</ScheduleProceeding>
          </HeaderArea>

          <DetailsArea>
            <FieldArea>
              <LabelComponent label="Procedimento" />
              <InputDetails
                Icon={MedicalPrescription}
                data={scheduling.procedimento}
              />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Data" />
              <InputDetails Icon={CalendarIcon} data={scheduling.data} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Hora" />
              <InputDetails Icon={ClockIcon} data={scheduling.hora} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Compareceu" />
              <InputDetails
                Icon={PatientIcon}
                data={scheduling.compareceu === 0 ? 'Não' : 'Sim'}
              />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Primeira Vez" />
              <InputDetails
                Icon={PatientIcon}
                data={scheduling.primeira_vez === 0 ? 'Não' : 'Sim'}
              />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Pagou" />
              <InputDetails
                Icon={PatientIcon}
                data={scheduling.pagou === 0 ? 'Não' : 'Sim'}
              />
            </FieldArea>

            {state.perfil !== 2 && (
              <ButtonArea>
                <ClinicalRecordButton
                  onPress={() => {
                    navigation.navigate('Patient', {
                      params: {id: scheduling.paciente, name},
                      screen: 'ClinicalRecords',
                    });
                  }}>
                  <MedicalRecordsIcon
                    width="25"
                    height="25"
                    fill={ButtonIconColor}
                  />
                  <ButtonText> Reg.Clínicos </ButtonText>
                </ClinicalRecordButton>
              </ButtonArea>
            )}
          </DetailsArea>
        </Scroller>
      )}
      {loading && <LoadingComponent />}
    </Container>
  );
};
