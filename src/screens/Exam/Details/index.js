import React from 'react';
import {Text} from 'react-native';
export default ({route}) => {
  const {id} = route.params;
  return <Text>Exam Details {id}</Text>;
};
