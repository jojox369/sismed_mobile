import React, {useEffect, useState} from 'react';
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

import {SearchDateFormater} from '../../../pipes/pipes';

export default ({route}) => {
  const navigation = useNavigation();
  //const {name} = route.params;
  const [loading, setloading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [list, setList] = useState([]);

  const getData = async () => {
    setloading(true);
    let response = await Api.getByPatient('DANILO');
    if (response != 'error') {
      if (Object.keys(response).length === 0) {
        setloading(false);
        setEmptyData(true);
      } else {
        setloading(false);
        setList(response);
      }
    } else {
      setloading(false);
      alert('Erro ao carregar as informações');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeText = (t) => {};

  const search = async () => {
    /*setLoading(true);
    if (emptyData) {
      setEmptyData(false);
    }
    let response = await Api.getByProntuario(searchText);

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
      alert('Erro ao tentar recuperar dados');
      setLoading(false);
    }*/
  };

  function handleClick(id) {
    navigation.navigate('ExamDetails', {id});
  }

  return (
    <Container>
      {!loading && (
        <Scroller>
          <SearchArea>
            <SearchInput
              placeholder="Digite a data de coleta"
              placeholderTextColor="#000000"
              value={searchText}
              onChangeText={(t) => setSearchText(SearchDateFormater(t))}
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
