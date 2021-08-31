import {
  Center,
  Text,
  Box,
  Stack,
  Heading,
  Input,
  Button,
  ButtonGroup,
  useToast,
  Badge,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { useRouter } from "next/router"
import { IEmployeesResponse } from "../../types"
import { IKnowledge } from "../../types"
import InputMask from "react-input-mask"

const RenderKnowLedge = ({ knowledge }: any) => {
  const colors = ["green", "orange", "pink"]
  return (
    <Box display='flex' flexWrap='wrap' justifyContent='space-between' alignItems='center'>
      {knowledge && knowledge.map((e: any, index: number) => {
        return (
          <Badge
            key={index}
            colorScheme={colors[Math.floor(Math.random() * 3)]}
            fontSize='0.8em'
          >
            {e.name}
          </Badge>
        )
      })}
    </Box>
  )
}

export const ValidateEmployee = () => {
  const [employee, setEmployee] = useState<IEmployeesResponse>()
  const router = useRouter()
  const { id } = router.query

  const toast = useToast()

  const fetchData = async () => {
    if (id) {
      const { data } = await api.get(`employee/${id}`)
      setEmployee(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleValidate = async (isValid: boolean) => {
    try {
      await api.put("employee/validate", {
        EmployeeId: id,
        isValid,
      })
      toast({
        description: `Usuário ${
          isValid ? "validado" : "invalidado"
        } com sucesso`,
        status: "success",
        duration: 3000,
        position: "top-right",
      })

      router.push("/registros")
    } catch (error) {
      console.log(error)
      toast({
        description: "Erro no servidor",
        status: "error",
        duration: 3000,
        position: "top-right",
      })
    }
  }

  return (
    <Center mt="20">
      <Stack>
        <Heading textAlign="center" size="lg" as="h3">
          {employee?.name}
        </Heading>
        <Input textAlign="center" isReadOnly value={employee?.email} />
        <Input
          as={InputMask}
          mask="999.999.99-99"
          textAlign="center"
          isReadOnly
          value={employee?.cpf}
        />
        <Input
          as={InputMask}
          mask="(99) 99999-9999"
          textAlign="center"
          isReadOnly
          value={employee?.cellPhone}
        />

        <RenderKnowLedge knowledge={employee?.knowledge} />

        <Button
          maxW="100%"
          colorScheme="orange"
          onClick={async () => await handleValidate(true)}
        >
          Validar
        </Button>
        <Button
          maxW="100%"
          colorScheme="pink"
          variant="outline"
          onClick={async () => await handleValidate(false)}
        >
          Invalidar
        </Button>
      </Stack>
    </Center>
  )
}
