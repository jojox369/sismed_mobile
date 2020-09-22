export const initialState = {
  nome: '',
  perfil: 0,
  id: 0
}

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setId':
      return { ...state, id: action.payload.id }
      break;
    case 'setNome':
      return { ...state, nome: action.payload.nome }
      break;
    case 'setCPF':
      return { ...state, cpf: action.payload.cpf }
      break;

    case 'setPerfil':
      return { ...state, perfil: action.payload.perfil }
      break;
    default:
      return state;
  }
}