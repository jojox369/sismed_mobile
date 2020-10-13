const BASE_API = 'https://sismed-api.herokuapp.com/';

export default {

  signIn: async (username, password) => {
    const req = await fetch(`${BASE_API}auth/`, {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
    const json = await req.json();
    return json;
  },

  getUserDetails: async (cpf, token) => {
    const req = await fetch(`${BASE_API}funcionario/login/${cpf}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
      },

    });
    const json = await req.json();
    return json;
  }
};