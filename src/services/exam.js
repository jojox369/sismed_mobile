import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://sismed-api.herokuapp.com/';

export default {
  getAll: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}exames`, {
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
    const req = await fetch(`${BASE_API}exames/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    if (req.status == 200) {
      return req.json();
    } else {
      return 'error';
    }
  },

  getByPatient: async (patientName) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}exames/paciente/${patientName}`, {
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

  getByPatienteAndCollectionDate: async (patientName, collectionDate) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(
      `${BASE_API}exames/paciente/${patientName}/dataColeta/${colectDate}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );

    if (req.status == 200) {
      return await req.json();
    } else {
      return 'error';
    }
  },

  getByPatientAndExamName: async (patientName, examName) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(
      `${BASE_API}exames/paciente/${patientName}/exame/${examName}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );

    if (req.status == 200) {
      return await req.json();
    } else {
      return 'error';
    }
  },

  getByCollectionDate: async (colectDate) => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}exames/dataColeta/${colectDate}`, {
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
