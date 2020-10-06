export const Cell = (value) => {
  return value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/g, '($1) $2 $3-$4');
};

export const Telefone = (value) => {
  return value.replace(/(\d{2})(\d{4})(\d{4})/g, '($1) $2-$3');
};

export const CPF = (value) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const unmaskCPF = (value) => {
  var unmask = value.replace(/[^0-9]+/g, '');
  return unmask;
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

export const BrazilianDate = (value) => {
  const date = value.split('-');
  return date[2] + '/' + date[1] + '/' + date[0];
};

export const SearchDateFormater = (value) => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '$1/$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const AmericanDate = (value) => {
  const date = value.split('/');
  return date[2] + '-' + date[1] + '-' + date[0];
};
