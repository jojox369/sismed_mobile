import React from 'react';
import styled from 'styled-components/native';

import HomeIcon from '../assets/home.svg'; //icone de inicio
import AccountIcon from '../assets/account.svg'; // profile icon
import TodayIcon from '../assets/today.svg'; // agenda icon
import PersonIcon from '../assets/person.svg'; // paciente icon
import ExamIcon from '../assets/exam.svg';

const TabArea = styled.View`
  height: 60px;
  background-color: #367A9D;
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex:1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  border-radius: 35px;
  border: 3px solid #367A9D;
  margin-top: -20px;
`;

export default ({ state, navigation }) => {

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  }
  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon style={{ opacity: state.index === 0 ? 1 : 0.5 }} width='24' height='24' fill='#FFFFFF' />
      </TabItem>

      <TabItem onPress={() => goTo('Paciente')}>
        <PersonIcon style={{ opacity: state.index === 1 ? 1 : 0.5 }} width='24' height='24' fill='#FFFFFF' />
      </TabItem>

      <TabItemCenter onPress={() => goTo('Agenda')}>
        <TodayIcon width='32' height='32' fill='#367A9D' />
      </TabItemCenter>

      <TabItem onPress={() => goTo('Exame')}>
        <ExamIcon style={{ opacity: state.index === 3 ? 1 : 0.5 }} width='24' height='24' fill='#FFFFFF' />
      </TabItem>

      <TabItem onPress={() => goTo('Profile')}>
        <AccountIcon style={{ opacity: state.index === 4 ? 1 : 0.5 }} width='24' height='24' fill='#FFFFFF' />
      </TabItem>

    </TabArea>
  );
}