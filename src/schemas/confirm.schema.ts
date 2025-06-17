// schemas/confirm.schema.ts
import * as yup from "yup";

const contactRegex = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, // simples e funcional
  phone: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, // aceita (11) 99999-9999 ou 11999999999
};

export const confirmSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  contact: yup
    .string()
    .required("Contato é obrigatório")
    .test(
      "is-valid-contact",
      "Digite um e-mail ou telefone válido",
      (value) => {
        if (!value) return false;
        return contactRegex.email.test(value) || contactRegex.phone.test(value);
      }
    ),
  adults: yup
    .number()
    .min(1, "Pelo menos 1 adulto é obrigatório")
    .required("Número de adultos é obrigatório")
    .typeError("Pelo menos 1 adulto é obrigatório"),
  children: yup
    .number()
    .min(0)
    .required("Número de crianças é obrigatório")
    .typeError("Número de crianças não pode estar vazio"),
});
