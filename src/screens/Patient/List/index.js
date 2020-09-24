import React, {useEffect, useState} from 'react';
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
import SearchIcon from '../../../assets/icons/search.svg';
import {SearchIconColor} from '../../../assets/styles';
import LoadingComponent from '../../../components/Loading';
import Card from '../../../components/PatienteCard';

import Api from '../../../services/patient';

export default () => {
  const [searchText, setSearchText] = useState();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const search = () => {
    console.log('aqui');
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle>Pacientes</HeaderTitle>
        </HeaderArea>
        <SearchArea>
          <SearchInput
            placeholder="Digite o prontuario do paciente"
            placeholderTextColor="#000000"
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
            keyboardType="numeric"
          />
          <SearchButton onPress={search}>
            <SearchIcon with="24" height="24" fill={SearchIconColor} />
          </SearchButton>
        </SearchArea>

        {loading && <LoadingComponent />}

        <ListArea>
          {list.map((item, k) => (
            <Card key={k} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
