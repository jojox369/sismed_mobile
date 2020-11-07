import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
} from './styles';
import SearchIcon from '../../../assets/icons/search.svg';
import ChooseFieldIcon from '../../../assets/icons/chooseField.svg';
import {SearchIconColor} from '../../../assets/styles';
import Card from '../../../components/PatientCard';
import LoadingComponent from '../../../components/Loading';
import EmptyDataCard from '../../../components/EmptyDataCard';
import {showMessage} from 'react-native-flash-message';
import DataErrorCard from '../../../components/DataErrorCard';
import {checkState} from '../../../assets/functions';
import Api from '../../../services/patient';
import Modal from '../../../components/Modal';
import {Cell} from '../../../pipes/pipes';

export default () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('nome');
  const [searchIndex, setSearchIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState(['nome', 'prontuario', 'celular']);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [dataError, setDataError] = useState(false);

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
        message: `Digite o ${searchField} do paciente`,
        type: 'warning',
        icon: 'warning',
      });
    } else {
      setLoading(true);

      let response;

      if (searchIndex === 0) {
        response = await Api.getByName(searchText);
      } else if (searchIndex === 1) {
        response = await Api.getByProntuario(searchText);
      } else {
        response = await Api.getByCell(searchText);
      }

      if (response != 'error') {
        if (Object.keys(response).length === 0) {
          setLoading(false);
          setEmptyData(true);
          setList(response);
        } else {
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

  const getData = async () => {
    setLoading(true);
    let response = await Api.getAll();

    if (response != 'error') {
      if (Object.keys(response).length === 0) {
        setLoading(false);
        setEmptyData(true);
        setList(response);
      } else {
        setLoading(false);
        setList(response);
      }
    } else {
      setLoading(false);
      showMessage({
        message: 'Erro ao tentar listar',
        type: 'danger',
        icon: 'danger',
      });
      setDataError(true);
    }
  };

  const onRefresh = () => {
    if (emptyData) {
      setEmptyData(false);
    }

    if (dataError) {
      setDataError(false);
    }

    setRefreshing(false);
    getData();
    setSearchText();
    setSearchField('nome');
    setSearchIndex(0);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (id) => {
    navigation.navigate('PatientDetails', {id});
  };

  const changeSearchField = (option) => {
    setSearchField(option.field);
    setSearchIndex(option.index);
    setSearchText('');
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
            <HeaderTitle>Pacientes</HeaderTitle>
          </HeaderArea>
          <SearchArea>
            <SearchInput
              placeholder={`Digite o ${searchField} do paciente`}
              placeholderTextColor="#000000"
              value={searchText}
              onChangeText={(t) => {
                searchIndex === 2 ? setSearchText(Cell(t)) : setSearchText(t);
              }}
              keyboardType={searchIndex === 0 ? 'default' : 'numeric'}
            />
            <SearchButton onPress={search}>
              <SearchIcon with="24" height="24" fill={SearchIconColor} />
            </SearchButton>

            <ChooseField onPress={() => setModalVisible(!modalVisible)}>
              <ChooseFieldIcon fill={SearchIconColor} />
            </ChooseField>
          </SearchArea>

          {emptyData && (
            <EmptyDataCard
              message="Nenhum paciente encontrado"
              subMessage="Arraste para baixo para baixo para atualizar a tela"
            />
          )}

          {dataError && (
            <DataErrorCard
              message="Ocorreu um erro ao tentar listar as informações"
              subMessage="Arraste para baixo para baixo para atualizar a tela"
            />
          )}

          {!loading && (
            <ListArea>
              {list.map((item, k) => (
                <Card
                  key={k}
                  data={item}
                  onPress={() => handleClick(item.id)}
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
