import React from 'react';
import {Container, HeaderArea, HeaderTitle} from './styles';
import SismedIcon from '../../assets/icons/sismed.svg';
export default () => {
  return (
    <Container>
      <HeaderArea>
        <SismedIcon width="100%" height="160" />
        <HeaderTitle>Seja Bem-vindo(a)</HeaderTitle>
      </HeaderArea>
    </Container>
  );
};
