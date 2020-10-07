import React, {useEffect, useState, useContext} from 'react';
import Api from '../../../services/schedule';
import InputDetails from '../../../components/InputDetails';
import LoadingComponent from '../../../components/Loading';
import LabelComponent from '../../../components/Label';
import {UserContext} from '../../../contexts/UserContext';

import PatientIcon from '../../../assets/icons/patient.svg';
import SchedulingIcon from '../../../assets/icons/scheduling.svg';
import ClockIcon from '../../../assets/icons/clock.svg';
import MedicalPrescription from '../../../assets/icons/medicalPrescription.svg';

import {
  Container,
  HeaderArea,
  IconArea,
  ScheduleProceeding,
  DetailsArea,
  FieldArea,
  Scroller,
} from './styles';

import CalendarIcon from '../../../assets/icons/calendar.svg';
import {BrazilianDate} from '../../../pipes/pipes';

export default ({route}) => {
  const {id, name} = route.params;

  const {state} = useContext(UserContext);

  const [scheduling, setScheduling] = useState({});
  const [loading, setLoading] = useState();

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
      setLoading(false);
      alert('Erro ao carregar as informações');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
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
          </DetailsArea>
        </Scroller>
      )}
      {loading && <LoadingComponent />}
    </Container>
  );
};
