import { Button, Table, Tbody, Td, Th, Thead, Tr, useColorModeValue as mode } from '@chakra-ui/react'
import { columns } from './_data'
import { IEmployeesResponse } from '../types'
import router from 'next/router'

// interface DataProps {}
interface IData {
  data: IEmployeesResponse[]
}

export const TableContent = ({ data }: IData) => {
  return (
    <Table my="8" borderWidth="1px" borderRadius="xl" fontSize="sm">
      <Thead bg={mode('brand.100', 'gray.800')}>
        <Tr>
          {columns.map((column, index) => (
            <Th whiteSpace="nowrap" scope="col" key={index}>
              {column.Header}
            </Th>
          ))}
          <Th />
        </Tr>
      </Thead>
      <Tbody bg={mode('white', 'gray.800')}>
        {data.map((row, index) => (
          <Tr key={index}>
            {columns.map((column, index) => {
              console.log('column', column)
              console.log('row', row)
              const cell = row[column.accessor as keyof typeof row]
              const element = column.Cell?.(cell) ?? cell
              return (
                <Td whiteSpace="nowrap" key={index}>
                  {element}
                </Td>
              )
            })}
            <Td textAlign="right">
              <Button onClick={() => {router.push('/')}} variant="link" colorScheme="blue">
                Ver mais
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
