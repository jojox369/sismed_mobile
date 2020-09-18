export const initialState = {
  nome: '',
  perfil: 0,
  id: 0
}

export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'setNome':
      return { ...state, nome: action.payload.nome }
      break;
    default:
      return state;
  }
}