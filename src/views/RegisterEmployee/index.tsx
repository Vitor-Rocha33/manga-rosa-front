import {
  Box,
  Button,
  ButtonGroup,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"
import { FormRegister } from "./FormRegister"

export const RegisterEmployee = () => {
  return (
    <Center width="100vw" p="20">
      <Stack alignItems="center" spacing="4">
        <Heading mb="18" as="h2" size="xl">
          Bem-vindo a Manga Rosa
        </Heading>

        <FormRegister />
      </Stack>
    </Center>
  )
}
