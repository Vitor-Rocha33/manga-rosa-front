import { useFormik } from "formik"
import * as Yup from 'yup'
import { cpf as cpfValidator } from 'cpf-cnpj-validator'
import api from "../../../services/api"
import { useToast } from "@chakra-ui/react"
import router from 'next/router'
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

  const toast = useToast()
  
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
    onSubmit: async (values, action) => {
      try {
        const { cellPhone, cpf, email, knowledge, name } = values
        const data = {
          cellPhone, cpf, email, knowledge, name
        }
        await api.post('employee', data)
        toast({
          description: 'Cadastro feito com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        router.push('/')
      } catch (error) {
        console.log(error.response.data)
        if(error.response.data.error === 'validate error') {
          toast({
            description: error.response?.data?.msg,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right'
          })
        }else {
          toast({
            description: 'Erro no servidor',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right'
          })
        }
      }finally {
        action.setSubmitting(false)
      }
    }
  })

  return { formik }
}