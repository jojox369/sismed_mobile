import React from 'react';
import styled from 'styled-components/native';

import HomeIcon from '../assets/icons/home.svg'; //icone de inicio
import AccountIcon from '../assets/icons/account.svg'; // profile icon
import TodayIcon from '../assets/icons/today.svg'; // agenda icon
import PersonIcon from '../assets/icons/person.svg'; // paciente icon
import ExamIcon from '../assets/icons/exam.svg';

import {TabBarColor} from '../assets/styles';

const TabArea = styled.View`
  height: 60px;
  background-color: ${TabBarColor};
  flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 35px;
  border: 3px solid ${TabBarColor};
  margin-top: -20px;
`;

export default ({state, navigation}) => {
  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };
  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <HomeIcon
          style={{opacity: state.index === 0 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>

      <TabItem onPress={() => goTo('Patient')}>
        <PersonIcon
          style={{opacity: state.index === 1 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>

      <TabItemCenter onPress={() => goTo('Schedule')}>
        <TodayIcon width="32" height="32" fill="#367A9D" />
      </TabItemCenter>

      <TabItem onPress={() => goTo('Exam')}>
        <ExamIcon
          style={{opacity: state.index === 3 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>

      <TabItem onPress={() => goTo('Profile')}>
        <AccountIcon
          style={{opacity: state.index === 4 ? 1 : 0.5}}
          width="24"
          height="24"
          fill="#FFFFFF"
        />
      </TabItem>
    </TabArea>
  );
};
