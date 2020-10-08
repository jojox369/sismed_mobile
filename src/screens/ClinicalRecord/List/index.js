import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Scroller,
  HeaderArea,
  SearchButton,
  HeaderTitle,
  HeaderSubTitle,
  SearchArea,
  SearchInput,
  ListArea,
} from './styles';
import SearchIcon from '../../../assets/icons/search.svg';
import {SearchIconColor} from '../../../assets/styles';
import Card from '../../../components/ClinicalRecordsCard';
import LoadingComponent from '../../../components/Loading';
import EmptyDataCard from '../../../components/EmptyDataCard';

import Api from '../../../services/clinicalRecords';
import {
  BrazilianDate,
  SearchDateFormatter,
  AmericanDate,
} from '../../../pipes/pipes';

export default ({route}) => {
  const navigation = useNavigation();
  const {id, name} = route.params;
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [emptyData, setEmptyData] = useState(false);
  const [searchText, setSearchText] = useState('');

  const search = async () => {
    setLoading(true);
    if (emptyData) {
      setEmptyData(false);
    }

    const newArray = list.filter((record) => {
      return record.data == searchText;
    });

    if (newArray.length === 0) {
      setEmptyData(true);
      setLoading(false);
      setList([]);
    } else {
      setList(newArray);
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    let response = await Api.getAll(id);

    if (response != 'error') {
      if (Object.keys(response).length === 0) {
        setLoading(false);
        setEmptyData(true);

        setList(response);
      } else {
        response.forEach((record) => {
          const timeArray = record.hora.split(':', 2);
          record.hora = timeArray[0] + ':' + timeArray[1];
          record.data = BrazilianDate(record.data);
        });
        setLoading(false);
        setList(response);
      }
    } else {
      alert('Erro ao tentar recuperar dados');
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

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (id) => {
    navigation.navigate('PatientDetails', {id});
  };

  return (
    <Container>
      {!loading && (
        <Scroller
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <HeaderArea>
            <HeaderTitle>{name}</HeaderTitle>
            <HeaderSubTitle>Registros Clínicos</HeaderSubTitle>
          </HeaderArea>
          <SearchArea>
            <SearchInput
              placeholder="Digite a data do registro"
              placeholderTextColor="#000000"
              value={searchText}
              onChangeText={(t) => {
                setSearchText(SearchDateFormatter(t));
              }}
              keyboardType="numeric"
            />
            <SearchButton onPress={search}>
              <SearchIcon with="24" height="24" fill={SearchIconColor} />
            </SearchButton>
          </SearchArea>

          {emptyData && (
            <EmptyDataCard
              message="Nenhum registro encontrado"
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
