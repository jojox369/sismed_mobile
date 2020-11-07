import AsyncStorage from '@react-native-community/async-storage';

const BASE_API = 'https://sismed-api.herokuapp.com/';

export default {
  getAll: async (id, date) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}agendamentos/${id}/${date}`, {
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

  getById: async (medicId, schedulingId) => {
    const token = await AsyncStorage.getItem('token');
    const schedulingReq = await fetch(
      `${BASE_API}agenda/${medicId}/${schedulingId}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );

    let response;

    if (schedulingReq.status == 200) {
      response = await schedulingReq.json();

      const typeHealthInsuranceReq = await fetch(
        `${BASE_API}tipoConvenio/${response.tipo_convenio}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      );

      const proceedingReq = await fetch(
        `${BASE_API}procedimento/${response.procedimento}`,
        {
          method: 'GET',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      );

      if (typeHealthInsuranceReq.status == 200) {
        const typeHealthInsuranceResponse = await typeHealthInsuranceReq.json();
        response.tipo_convenio = typeHealthInsuranceResponse.nome;

        const healthInsuranceReq = await fetch(
          `${BASE_API}convenios/${typeHealthInsuranceResponse.convenio}`,
          {
            method: 'GET',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        );

        const healthInsuranceResponse = await healthInsuranceReq.json();
        response.convenio = healthInsuranceResponse.nome;
      }

      if (proceedingReq.status == 200) {
        const proceedingResponse = await proceedingReq.json();
        response.procedimento = proceedingResponse.descricao;
      }
      return response;
    } else {
      return 'error';
    }
  },

  getByPatient: async (patient) => {
    const token = await AsyncStorage.getItem('token');

    const req = await fetch(`${BASE_API}agendamentos/paciente/${patient}`, {
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
