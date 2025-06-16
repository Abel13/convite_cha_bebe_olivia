// schemas/confirm.schema.ts
import * as yup from "yup";

export const confirmSchema = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  contact: yup.string().required("Contato é obrigatório"),
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
