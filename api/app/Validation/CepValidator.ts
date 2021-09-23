import * as yup from 'yup';

export const schema = yup.object().shape({
  cep: yup.string().length(8).required(),
});