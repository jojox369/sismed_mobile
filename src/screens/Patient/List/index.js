import React, {useEffect, useState} from 'react';
import {RefreshControl, Text} from 'react-native';
import {
  Container,
  Scroller,
  HeaderArea,
  SearchButton,
  HeaderTitle,
  SearchArea,
  SearchInput,
  ListArea,
  NotFoundDataArea,
  RefreshScreenButton,
  RefreshScreenButtonText,
} from './styles';
import SearchIcon from '../../../assets/icons/search.svg';
import {SearchIconColor} from '../../../assets/styles';
import LoadingComponent from '../../../components/Loading';
import Card from '../../../components/PatientCard';
import EmptyDataCard from '../../../components/EmptyDataCard';

import Api from '../../../services/patient';

export default () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [patient, setPatient] = useState('');

  const search = async () => {
    setLoading(true);
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
    }
  };

  const getData = async () => {
    setLoading(true);
    let response = await Api.getAll();

    if (response != 'error') {
      setList(response);
      setLoading(false);
    } else {
      alert('Erro ao tentar recuperar dados');
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    getData();
  };

  const openDetailsScreen = () => {
    console.log(patient);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderArea>
          <HeaderTitle>Pacientes</HeaderTitle>
        </HeaderArea>
        <SearchArea>
          <SearchInput
            placeholder="Digite o prontuario do paciente"
            placeholderTextColor="#000000"
            value={searchText}
            onChangeText={(t) => {
              setSearchText(t);
            }}
            keyboardType="numeric"
          />
          <SearchButton onPress={search}>
            <SearchIcon with="24" height="24" fill={SearchIconColor} />
          </SearchButton>
        </SearchArea>

        {loading && <LoadingComponent MarginTop="90" />}

        {!loading && (
          <EmptyDataCard
            message="Nenhum paciente encontrado"
            subMessage="Arraste para baixo para baixo para listar os pacientes"
          />
        )}
      </Scroller>
    </Container>
  );
};

/**
 * 
 * <ListArea>
          {list.map((item, k) => (
            <Card key={k} data={item} />
          ))}
        </ListArea>
 * 
 * 
 */
