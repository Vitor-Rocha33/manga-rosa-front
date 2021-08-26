import { useFormik } from "formik"
import * as Yup from 'yup'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'

interface IRegisterInitialValues {
  name: string,
  email: string,
  cpf: string,
  cellPhone: string,
  knowledge: string[]
}


const initialValuesRegister: IRegisterInitialValues = {
  name: '',
  email: '',
  cpf: '',
  cellPhone: '',
  knowledge: []
}

export const useFormRegister = () => {
  
  const FormRegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Insira um nome maior que 3 digitos')
      .max(100, 'Permitido nome com maximo de 100 caracteres')
      .required('Nome é obrigatório'),
    email: Yup.string()
      .email('Insira um email válido')
      .max(100, 'Permitido e-mail com máximo de 100 caracteres')
      .required('E-mail é obrigatório'),
    cpf: Yup.mixed()
    .test('valid-cpf', 'Insira um CPF válido', (value, context) => cpfValidator.isValid(value) )
    .required(),
    knowledge: Yup.array()
    .min(1, 'Selecione pelo menos 1 conhecimento')
    .max(3, 'Selecione no máximo 3 conhecimentos')
  })

  const formik = useFormik({
    validationSchema: FormRegisterSchema,
    initialValues: initialValuesRegister,
    onSubmit: (values, action) => {
      alert(JSON.stringify(values))
    }
  })

  return { formik }
}