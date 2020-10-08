import React, {useState, useEffect} from 'react';
import ExamApi from '../../../services/exam';
import LaboratoryApi from '../../../services/laboratory';
import InputDetails from '../../../components/InputDetails';
import LoadingComponent from '../../../components/Loading';
import LabelComponent from '../../../components/Label';
import {BrazilianDate, Phone} from '../../../pipes/pipes';

import ExamIcon from '../../../assets/icons/exam.svg';
import CalendarIcon from '../../../assets/icons/calendar.svg';
import PhoneIcon from '../../../assets/icons/phone.svg';
import LaboratoryIcon from '../../../assets/icons/laboratory.svg';

import {showMessage} from 'react-native-flash-message';
import DataErrorCard from '../../../components/DataErrorCard';

import {
  Container,
  HeaderArea,
  IconArea,
  ExamName,
  DetailsArea,
  FieldArea,
  Scroller,
} from './styles';
export default ({route}) => {
  const [loading, setloading] = useState(false);
  const [exam, setExam] = useState({});
  const [laboratory, setLaboratory] = useState({});
  const {id} = route.params;
  const [dataError, setDataError] = useState(false);

  const getData = async () => {
    setloading(true);
    let examResponse = await ExamApi.getById(id);

    if (examResponse != 'error') {
      examResponse.data_coleta = BrazilianDate(examResponse.data_coleta);
      examResponse.data_envio = BrazilianDate(examResponse.data_envio);
      examResponse.data_retorno
        ? BrazilianDate(examResponse.data_retorno)
        : (examResponse.data_retorno = 'Pendente');
      setExam(examResponse);

      let laboratoryResponse = await LaboratoryApi.getById(
        examResponse.laboratorio,
      );

      if (laboratoryResponse != 'error') {
        laboratoryResponse.telefone_fixo = Phone(
          laboratoryResponse.telefone_fixo,
        );
        setLaboratory(laboratoryResponse);
        setloading(false);
      } else {
        alert('erro ao carregar informações do laboratorio');
        setloading(false);
      }
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
              <ExamIcon width="100" height="100" fill="#000000" />
            </IconArea>

            <ExamName>{exam.nome}</ExamName>
          </HeaderArea>

          <DetailsArea>
            <FieldArea>
              <LabelComponent label="Data de Coleta" />
              <InputDetails Icon={CalendarIcon} data={exam.data_coleta} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Data de Envio" />
              <InputDetails Icon={CalendarIcon} data={exam.data_envio} />
            </FieldArea>

            <FieldArea>
              <LabelComponent label="Data de Retorno" />
              <InputDetails Icon={CalendarIcon} data={exam.data_retorno} />
            </FieldArea>
            <FieldArea>
              <LabelComponent label="Laboratorio" />
              <InputDetails Icon={LaboratoryIcon} data={laboratory.nome} />
            </FieldArea>
            <FieldArea>
              <LabelComponent label="Telefone" />
              <InputDetails Icon={PhoneIcon} data={laboratory.telefone_fixo} />
            </FieldArea>
          </DetailsArea>
        </Scroller>
      )}
      {loading && <LoadingComponent />}
    </Container>
  );
};
