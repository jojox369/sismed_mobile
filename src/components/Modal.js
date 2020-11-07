import React from 'react';

import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ButtonColor} from '../assets/styles';

export default ({showModal, toggle, options, changeSearchField}) => {
  function changeField(option, index) {
    changeSearchField({field: option, index});
    toggle();
  }

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={{...styles.centeredView, backgroundColor: '#000000aa'}}>
          <View style={styles.modalView}>
            {options.map((option, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => changeField(option, i)}
                style={styles.buttonOptions}>
                <Text style={styles.buttonText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 200,
    height: 200,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonOptions: {
    borderRadius: 15,
    borderColor: ButtonColor,
    borderStyle: 'solid',
    borderWidth: 2,
    marginBottom: 10,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    margin: 5,
    fontWeight: 'bold',
    color: '#000000',
  },
});
