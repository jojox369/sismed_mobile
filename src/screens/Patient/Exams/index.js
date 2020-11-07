import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Scroller,
  SearchArea,
  SearchButton,
  SearchInput,
  ListArea,
  ChooseField,
} from './styles';

import Api from '../../../services/exam';

import SearchIcon from '../../../assets/icons/search.svg';
import {SearchIconColor} from '../../../assets/styles';
import ChooseFieldIcon from '../../../assets/icons/chooseField.svg';

import EmptyDataCard from '../../../components/EmptyDataCard';
import Card from '../../../components/ExamCard';
import LoadingComponent from '../../../components/Loading';

import {SearchDateFormatter, AmericanDate} from '../../../pipes/pipes';

import {showMessage} from 'react-native-flash-message';
import DataErrorCard from '../../../components/DataErrorCard';
import Modal from '../../../components/Modal';

export default ({route}) => {
  const navigation = useNavigation();
  const {name} = route.params;
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [list, setList] = useState([]);
  const [searchIndex, setSearchIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState(['exame', 'data de coleta']);

  const getData = async () => {
    setLoading(true);
    let response = await Api.getByPatient(name);
    if (response != 'error') {
      if (Object.keys(response).length === 0) {
        setLoading(false);
        setEmptyData(true);
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

  useEffect(() => {
    getData();
  }, []);

  const search = async () => {
    if (emptyData) {
      setEmptyData(false);
    }

    if (dataError) {
      setDataError(false);
    }

    if (searchText == '') {
      showMessage({
        message: `Digite ${
          searchIndex === 0 ? ' o nome do exame' : 'a data de coleta'
        }`,
        type: 'warning',
        icon: 'warning',
      });
    } else {
      setLoading(true);
      let response;
      if (searchIndex === 0) {
        response = await Api.getByPatientAndExamName(name, searchText);
      } else {
        response = await Api.getByPatienteAndCollectionDate(
          name,
          AmericanDate(searchText),
        );
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
        setLoading(false);
        showMessage({
          message: 'Erro ao tentar listar',
          type: 'danger',
          icon: 'danger',
        });
        setDataError(true);
        setList([]);
      }
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
  };

  function handleClick(id) {
    navigation.navigate('ExamDetails', {id});
  }

  const changeSearchField = (option) => {
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
          <SearchArea>
            <SearchInput
              placeholder={`Digite ${
                searchIndex === 0 ? 'o nome do exame' : 'a data de coleta'
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

          {emptyData && (
            <EmptyDataCard
              message="Nenhum exame encontrado"
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
