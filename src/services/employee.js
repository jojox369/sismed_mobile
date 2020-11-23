import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://sismed-api.herokuapp.com/';

export default {
  getAll: async () => {
    const token = await AsyncStorage.getItem('token');
    const req = await fetch(`${BASE_API}medicos/`, {
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
