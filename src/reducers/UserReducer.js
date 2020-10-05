export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setUser':
      return {
        ...state,
        id: action.payload.user.id,
        perfil: action.payload.user.perfil,
        nome: action.payload.user.nome,
        cpf: action.payload.user.cpf,
      };
      break;
    default:
      return state;
  }
};
