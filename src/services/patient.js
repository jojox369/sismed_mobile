import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://sismed-api.herokuapp.com/';

export default {
  getAll: async () => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}pacientes/`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (req.status == 200) {
      return await req.json();
    } else {
      return 'error';
    }
  },

  getByProntuario: async (prontuario) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}pacientes/prontuario/${prontuario}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (req.status == 200) {
      return await req.json();
    } else {
      return 'error';
    }
  },

  getById: async (id) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}pacientes/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (req.status == 200) {
      return await req.json();
    } else {
      return 'error';
    }
  },

  getByName: async (name) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}pacientes/nome/${name}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (req.status == 200) {
      return await req.json();
    } else {
      return 'error';
    }
  },

  getByCell: async (cell) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}pacientes/celular/${cell}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    if (req.status == 200) {
      return await req.json();
    } else {
      return 'error';
    }
  },
};
