const BASE_API = 'https://sismed-api.herokuapp.com/';

export default {

  

  forgotPassword: async (cpf) => {
    const req = await fetch(`${BASE_API}recover/password/${cpf}`, {
      method: 'GET',
      headers: {

        'Content-Type': 'application/json'
      },

    });
    if (req.status == 200) {
        return await req.json();
      } else if(req.status == 204){
        return 'unauthorized';
      } else {
        return 'error';
      }
  },

  getVerificationCode: async (cpf) => {
    const req = await fetch(`${BASE_API}funcionario/code/${cpf}`, {
      method: 'GET',
      headers: {

        'Content-Type': 'application/json'
      },

    });
    if (req.status == 200) {
        return await req.json();
      }else {
        return 'error';
      }
  },

  uptadePassword: async (userId, username, password) => {
    const req = await fetch(`${BASE_API}users/${userId}/`, {
      method: 'PUT',
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })

    });
    console.log(req);
    if (req.status == 200) {
        return await req.json();
    } else {
        return 'error';
    }
  },
  
};