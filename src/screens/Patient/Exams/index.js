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
} from './styles';

import Api from '../../../services/exam';

import SearchIcon from '../../../assets/icons/search.svg';
import {SearchIconColor} from '../../../assets/styles';

import EmptyDataCard from '../../../components/EmptyDataCard';
import Card from '../../../components/ExamCard';
import LoadingComponent from '../../../components/Loading';

import {SearchDateFormatter, AmericanDate} from '../../../pipes/pipes';

export default ({route}) => {
  const navigation = useNavigation();
  const {name} = route.params;
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [list, setList] = useState([]);

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
      alert('Erro ao carregar as informações');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const search = async () => {
    setLoading(true);
    if (emptyData) {
      setEmptyData(false);
    }

    let response = await Api.getByPatienteAndCollectionDate(
      name,
      AmericanDate(searchText),
    );

    if (response != 'error') {
      if (Object.keys(response).length === 0) {
        setLoading(false);
        setEmptyData(true);
        setList(response);
      } else {
        setLoading(false);
        setList(response);
      }
    }
  };

  const onRefresh = () => {
    if (emptyData) {
      setEmptyData(false);
    }
    setRefreshing(false);
    getData();
    setSearchText();
  };

  function handleClick(id) {
    navigation.navigate('ExamDetails', {id});
  }

  return (
    <Container>
      {!loading && (
        <Scroller
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <SearchArea>
            <SearchInput
              placeholder="Digite a data de coleta"
              placeholderTextColor="#000000"
              value={searchText}
              onChangeText={(t) => setSearchText(SearchDateFormatter(t))}
              keyboardType="number-pad"
            />
            <SearchButton onPress={search}>
              <SearchIcon with="24" height="24" fill={SearchIconColor} />
            </SearchButton>
          </SearchArea>
          {emptyData && (
            <EmptyDataCard
              message="Nenhum exame encontrado"
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
