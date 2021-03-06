import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  CheckboxGroup,
  HStack,
  Checkbox,
  Grid,
  Text
} from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import api from "../../../services/api"
import { useFormRegister } from "./hooks"
import { KnowledgeLabel } from "../../../constants"
import InputMask from 'react-input-mask'

interface IKnowLedgeResponse {
  name: string
}

export const FormRegister = () => {
  const [knowledge, setKnowledge] = useState<IKnowLedgeResponse[]>([])
  const { formik } = useFormRegister()
  const color: string = "pink.400"

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { checked, value } = e.target
    if (checked) {
      formik.setFieldValue("knowledge", [...formik.values.knowledge, value])
    } else {
      formik.setFieldValue(
        "knowledge",
        formik.values.knowledge.filter((v) => v !== value)
      )
    }
  }

  const fetchData = async () => {
    const { data } = await api.get("knowledge")
    if (data) {
      setKnowledge(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack>
        <Box>
          <FormControl
            id="name"
            isInvalid={!!(formik.errors?.name && formik.touched?.name)}
          >
            <FormLabel>Nome:</FormLabel>
            <Input {...formik.getFieldProps("name")} focusBorderColor={color} name="name" />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            id="email"
            isInvalid={!!(formik.errors.email && formik.touched.email)}
          >
            <FormLabel>Email:</FormLabel>
            <Input {...formik.getFieldProps('email')} focusBorderColor={color} name="email" />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            id="cpf"
            isInvalid={!!(formik.errors.cpf && formik.touched.cpf)}
          >
            <FormLabel>CPF:</FormLabel>
            <Input as={InputMask} mask={'999.999.999-99'} {...formik.getFieldProps('cpf')} focusBorderColor={color} name="cpf" />
            <FormErrorMessage>{formik.errors.cpf}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl
            id="cellPhone"
            isInvalid={!!(formik.errors.cellPhone && formik.touched.cellPhone)}
          >
            <FormLabel>Celular:(opcional)</FormLabel>
            <Input as={InputMask} mask={'(99) 99999-9999'} {...formik.getFieldProps('cellPhone')} focusBorderColor={color} name="cellPhone" />
            <FormErrorMessage>{formik.errors.cellPhone}</FormErrorMessage>
          </FormControl>
        </Box>
        <Box>
          <FormControl as="fieldset" isInvalid={!!(formik.errors.knowledge && formik.touched.knowledge)}>
            <FormLabel>Selecione seus conhecimentos: </FormLabel>
            <CheckboxGroup>
              <Grid templateColumns="repeat(3, 1fr)" columnGap='10'>
                {knowledge.map((e) => {
                  return (
                    <Checkbox
                    onChange={handleChange}
                    name="knowledge"
                    value={e.name}
                    colorScheme='pink'
                    >
                      {
                        KnowledgeLabel.find((item) => e.name === item.name)
                        ?.label
                      }
                    </Checkbox>
                  )
                })}
              </Grid>
            </CheckboxGroup>
            <FormErrorMessage>{formik.errors.knowledge}</FormErrorMessage>
            <Text mt='2' fontSize='xs'>Selecione no m??nimo 1 e no m??ximo 3 conhecimentos</Text>
          </FormControl>
        </Box>
        <Button isLoading={formik.isSubmitting} type="submit" colorScheme="orange" mt="5" width="100%">
          Salvar
        </Button>
      </Stack>
    </form>
  )
}
