import { useFormik } from "formik"

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
  const formik = useFormik({
    initialValues: initialValuesRegister,
    onSubmit: (values, action) => {
      alert(JSON.stringify(values))
    }
  })

  return { formik }
}