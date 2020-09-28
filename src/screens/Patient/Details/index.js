import React, {useEffect, useState} from 'react';
import Api from '../../../services/patient';
import {Cell, CPF, Birthday} from '../../../pipes/pipes';
import InputDetails from '../../../components/InputDetails';
import LoadingComponent from '../../../components/Loading';
import LabelComponent from '../../../components/Label';
import UserIcon from '../../../assets/icons/user.svg';
import ProntuarioIcon from '../../../assets/icons/prontuarioMedico.svg';
import CpfIcon from '../../../assets/icons/cpf.svg';
import AgeIcon from '../../../assets/icons/calendar.svg';
import CellIcon from '../../../assets/icons/smartphone.svg';
import {
  Container,
  HeaderArea,
  IconArea,
  PatientName,
  DetailsArea,
  FieldArea,
  Scroller,
} from './styles';

export default ({route, navigation}) => {
  const [patient, setPatient] = useState({});
  const [loading, setloading] = useState(false);
  const [cpf, setCpf] = useState();
  const [cell, setCell] = useState();
  const [birthday, setBirthday] = useState();
  const {id} = route.params;

  const getData = async () => {
    setloading(true);
    let response = await Api.getById(id);

    if (response != 'error') {
      setloading(false);
      setPatient(response);
      setCpf(CPF(response.cpf));
      setCell(Cell(response.celular));
      setBirthday(Birthday(response.data_nascimento));
    } else {
      setloading(false);
      alert('Erro ao carregar as informações');
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Scroller>
        {!loading && (
          <HeaderArea>
            <IconArea>
              <UserIcon width="100" height="100" fill="#000000" />
            </IconArea>

            <PatientName>{patient.nome}</PatientName>
          </HeaderArea>
        )}

        {!loading && (
          <DetailsArea>
            <FieldArea>
              <LabelComponent label="Prontuario" />
              <InputDetails Icon={ProntuarioIcon} data={patient.prontuario} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="CPF" />
              <InputDetails Icon={CpfIcon} data={cpf} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Celular" />
              <InputDetails Icon={CellIcon} data={cell} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Data de Nascimento" />
              <InputDetails Icon={AgeIcon} data={birthday} />
            </FieldArea>
          </DetailsArea>
        )}
      </Scroller>
      {loading && <LoadingComponent />}
    </Container>
  );
};
