import {
  Box,
  Text,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Flex,
  ButtonGroup,
  Button,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { TableContent } from "./table/TableContent"
import { IEmployeesResponse } from "../../types"

export const ListingEmployee = () => {
  const [employees, setEmployees] = useState<IEmployeesResponse[]>([])
  const [count, setCount] = useState<number>(0)
  const [page, setPage] = useState<number>(0)

  const isDisable = page + 1 === Math.ceil(count / 5)

  const fetchListingEmployee = async () => {
    const { data } = await api.get("employee", {
      params: {
        page,
      },
    })
    setEmployees(data.rows)
    setCount(data.count)
  }

  useEffect(() => {
    fetchListingEmployee()
    console.log(employees)
  }, [page])

  return (
    <Box>
      <TableContent data={employees}></TableContent>
      <Flex px="10" align="center" justify="space-between">
        <Flex align="center">
          <Text fontSize="sm">Página {page + 1}</Text>
        </Flex>
        <ButtonGroup variant="outline" size="sm">
          <Button onClick={() => setPage(page != 0 ? page - 1 : 0)} as="a" rel="prev">
            Anterior
          </Button>
          <Button
            isDisabled={isDisable}
            onClick={() => {
              if(!isDisable) {
                setPage(page + 1)
              }
            }}
            as="a"
            rel="next"
          >
            Próxima
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  )
}
