import React, {useEffect, useState, useContext} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SearchIcon from '../../../assets/icons/search.svg';
import ChooseFieldIcon from '../../../assets/icons/chooseField.svg';
import {SearchIconColor} from '../../../assets/styles';
import Card from '../../../components/ScheduleCard';
import LoadingComponent from '../../../components/Loading';
import EmptyDataCard from '../../../components/EmptyDataCard';
import {UserContext} from '../../../contexts/UserContext';
import Api from '../../../services/schedule';
import EmployeeApi from '../../../services/employee';
import {showMessage} from 'react-native-flash-message';
import DataErrorCard from '../../../components/DataErrorCard';
import Modal from '../../../components/Modal';
import {checkState} from '../../../assets/functions';
import RNPickerSelect from 'react-native-picker-select';
import {
  Container,
  Scroller,
  HeaderArea,
  SearchButton,
  HeaderTitle,
  SearchArea,
  SearchInput,
  ListArea,
  ChooseField,
  SearchEmployeeArea,
  EmployeeInput,
} from './styles';
import {AmericanDate, SearchDateFormatter} from '../../../pipes/pipes';

export default () => {
  const navigation = useNavigation();
  const {state} = useContext(UserContext);

  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [searchIndex, setSearchIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState(['paciente', 'data do agendamento']);
  const [showData, setShowData] = useState(true);
  const [medics, setMedics] = useState([]);
  const [medicId, setMedicId] = useState();

  const search = async () => {
    if (emptyData) {
      setEmptyData(false);
    }

    if (dataError) {
      setDataError(false);
    }
    if (searchText == '') {
      setEmptyData(!checkState(list));

      showMessage({
        message: `Digite ${
          searchIndex === 0 ? 'o nome do paciente' : 'a data do agendamento'
        }`,
        type: 'warning',
        icon: 'warning',
      });
    } else {
      setLoading(true);
      let response;
      if (searchIndex === 0) {
        response = await Api.getByPatient(searchText);
      } else {
        response = await Api.getAll(state.id, AmericanDate(searchText));
      }

      if (response != 'error') {
        if (Object.keys(response).length === 0) {
          setLoading(false);
          setEmptyData(true);
          setList(response);
        } else {
          response.forEach((scheduling) => {
            const time = scheduling.hora.split(':', 2);
            scheduling.hora = time[0] + ':' + time[1];
          });
          setLoading(false);
          setList(response);
        }
      } else {
        showMessage({
          message: 'Erro ao tentar listar',
          type: 'danger',
          icon: 'danger',
        });
        setLoading(false);
        setDataError(true);
        setList([]);
      }
    }
  };

  const generateDate = () => {
    const currentDate = new Date();
    let currentDay = currentDate.getUTCDate();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const currentYear = currentDate.getUTCFullYear();
    if (currentDay < 10) {
      currentDay = '0' + currentDay;
    }
    return currentYear + '-' + currentMonth + '-' + currentDay;
  };

  const getData = async () => {
    setLoading(true);

    let response;

    if (medicId) {
      response = await Api.getAll(medicId, generateDate());
    } else {
      response = await Api.getAll(state.id, generateDate());
    }

    if (response != 'error') {
      if (Object.keys(response).length === 0) {
        setLoading(false);
        setEmptyData(true);
        setList([]);
      } else {
        setShowData(true);
        setLoading(false);
        response.forEach((scheduling) => {
          const time = scheduling.hora.split(':', 2);
          scheduling.hora = time[0] + ':' + time[1];
        });
        setList(response);
      }
    } else {
      showMessage({
        message: 'Erro ao tentar listar',
        type: 'danger',
        icon: 'danger',
      });
      setLoading(false);
      setDataError(true);
      setList([]);
    }
  };

  const getAllEmployees = async () => {
    const request = await EmployeeApi.getAll();
    if (request !== 'error') {
      setMedics(
        request.map((medic) => {
          return {label: medic.nome, value: medic.id};
        }),
      );
    } else {
      showMessage({
        message: 'Não foi possivel recuperar os dados dos médicos',
        type: 'danger',
        icon: 'danger',
      });
    }
  };
  const verifyUser = () => {
    if (state.perfil === 2) {
      setShowData(false);
      getAllEmployees();
    } else {
      getData();
    }
  };
  useEffect(() => {
    if (medicId) {
      getData();
    } else {
      verifyUser();
    }
  }, [medicId]);

  const onRefresh = () => {
    if (emptyData) {
      setEmptyData(false);
    }

    if (dataError) {
      setDataError(false);
    }

    setRefreshing(false);
    getData();
  };

  const handleClick = (id, name) => {
    navigation.navigate('ScheduleDetails', {id: id, name: name});
  };

  const changeSearchField = (option) => {
    setSearchText('');
    setSearchIndex(option.index);
  };

  return (
    <Container>
      {!loading && (
        <Scroller
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Modal
            showModal={modalVisible}
            toggle={() => setModalVisible(!modalVisible)}
            options={options}
            changeSearchField={changeSearchField}
          />
          <HeaderArea>
            <HeaderTitle>Agenda</HeaderTitle>
          </HeaderArea>

          {state.perfil === 2 && (
            <RNPickerSelect
              onValueChange={(value) => setMedicId(value)}
              placeholder={{label: 'Selecione o médico'}}
              items={medics}
              style={{...SearchEmployeeArea}}
              useNativeAndroidPickerStyle={false}
            />
          )}

          {showData && !emptyData && (
            <SearchArea>
              <SearchInput
                placeholder={`Digite ${
                  searchIndex === 0
                    ? 'o nome do paciente'
                    : 'a data do agendamento'
                }`}
                placeholderTextColor="#000000"
                value={searchText}
                onChangeText={(t) =>
                  searchIndex === 0
                    ? setSearchText(t)
                    : setSearchText(SearchDateFormatter(t))
                }
                keyboardType={searchIndex === 0 ? 'default' : 'numeric'}
              />
              <SearchButton onPress={search}>
                <SearchIcon with="24" height="24" fill={SearchIconColor} />
              </SearchButton>

              <ChooseField onPress={() => setModalVisible(!modalVisible)}>
                <ChooseFieldIcon fill={SearchIconColor} />
              </ChooseField>
            </SearchArea>
          )}

          {emptyData && (
            <EmptyDataCard
              message="Nenhum Agendamento encontrado"
              subMessage="Arraste para baixo para baixo para atualizar a tela"
            />
          )}

          {dataError && (
            <DataErrorCard
              message="Ocorreu um erro ao tentar listar as informações"
              subMessage="Arraste para baixo para baixo para atualizar a tela"
            />
          )}

          {!loading && showData && (
            <ListArea>
              {list.map((item, k) => (
                <Card
                  key={k}
                  data={item}
                  onPress={() => handleClick(item.id, item.paciente.nome)}
                />
              ))}
            </ListArea>
          )}
        </Scroller>
      )}
      {loading && <LoadingComponent />}
    </Container>
  );
};
