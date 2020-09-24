import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Container, HeaderArea, HeaderTitle} from './styles';
import SismedIcon from '../../assets/icons/sismed.svg';
import {} from '../../assets/functions';
export default () => {
  const {state} = useContext(UserContext);
  return (
    <Container>
      <HeaderArea>
        <SismedIcon width="100%" height="160" />
        <HeaderTitle>Seja Bem-vindo {state.nome} </HeaderTitle>
      </HeaderArea>
    </Container>
  );
};
