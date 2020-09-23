import React, {useContext} from 'react';
import {UserContext} from '../../contexts/UserContext';
import {Container, HeaderArea, HeaderTitle} from './styles';
import SismedIcon from '../../assets/sismed.svg';

export default ({state, navigation}) => {
  const {state: user} = useContext(UserContext);

  return (
    <Container>
      <HeaderArea>
        <SismedIcon width="100%" height="160" />
        <HeaderTitle>Seja Bem-vindo {user.nome} </HeaderTitle>
      </HeaderArea>
    </Container>
  );
};
