export const Cell = (value) => {
  return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');
};

export const Telefone = (value) => {
  return value.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
};

export const CPF = (value) => {
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
};

export const CNPJ = (value) => {
  return value.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5',
  );
};

export const RG = (value) => {
  return value.replace(/(\d{2})(\d{3})(\d{3})(\d{1})/g, '$1.$2.$3-$4');
};
