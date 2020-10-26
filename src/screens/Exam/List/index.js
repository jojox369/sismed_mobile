import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {
  Container,
  Scroller,
  HeaderArea,
  SearchButton,
  HeaderTitle,
  SearchArea,
  SearchInput,
  ListArea,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import Api from '../../../services/exam';
import {AmericanDate, SearchDateFormatter} from '../../../pipes/pipes';
import SearchIcon from '../../../assets/icons/search.svg';
import {SearchIconColor} from '../../../assets/styles';

import Card from '../../../components/ExamCard';
import LoadingComponent from '../../../components/Loading';
import EmptyDataCard from '../../../components/EmptyDataCard';
import DataErrorCard from '../../../components/EmptyDataCard';
import {showMessage} from 'react-native-flash-message';
import {checkState} from '../../../assets/functions';

export default () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState();
  const [list, setList] = useState([]);
  const [emptyData, setEmptyData] = useState(false);
  const [dataError, setDataError] = useState(false);

  const getData = async () => {
    setLoading(true);
    let response = await Api.getAll();

    if (response !== 'error') {
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
        message: 'Digite a data de coleta do exame',
        type: 'warning',
        icon: 'warning',
      });
    } else {
      setLoading(true);

      let response = await Api.getByCollectionDate(AmericanDate(searchText));

      if (response !== 'error') {
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

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (id) => {
    navigation.navigate('ExamDetails', {id});
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
    setSearchText('');
  };

  return (
    <Container>
      {!loading && (
        <Scroller
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <HeaderArea>
            <HeaderTitle>Exames</HeaderTitle>
          </HeaderArea>
          <SearchArea>
            <SearchInput
              placeholder="Digite a data de coleta"
              placeholderTextColor="#000000"
              value={searchText}
              onChangeText={(t) => setSearchText(SearchDateFormatter(t))}
              keyboardType="numeric"
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
