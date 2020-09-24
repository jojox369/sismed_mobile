import React from 'react';
import {
  Container,
  Scroller,
  HeaderArea,
  SearchButton,
  HeaderTitle,
  SearchArea,
  SearchInput,
} from './styles';
import {Text} from 'react-native';
import SearchIcon from '../../assets/icons/search.svg';
import {SearchIconColor} from '../../assets/styles';
export default () => {
  const search = () => {
    console.log('aqui');
  };

  return (
    <Container>
      <Scroller>
        <HeaderArea>
          <HeaderTitle>Pacientes</HeaderTitle>
        </HeaderArea>
        <SearchArea>
          <SearchButton onPress={search}>
            <SearchIcon with="24" height="24" fill={SearchIconColor} />
          </SearchButton>
        </SearchArea>
      </Scroller>
    </Container>
  );
};
