import { Badge } from '@chakra-ui/react'

const badgeEnum: Record<string, string> = {
  true: 'green',
  false: 'orange',
}

const statusBadge = [
  { value: 'true', label: 'Válido' },
  { value: 'false', label: 'Não válido' },
  { value: 'pending', label: 'Pendente' }
]

const returnStatus = (data: any) => {
  const status = statusBadge.find(status => status.value === data.toString())
  console.log(status)
  if (status) {
    return status.label
  }
}

export const columns = [
  {
    Header: 'Nome',
    accessor: 'name',
  },
  {
    Header: 'E-mail',
    accessor: 'email'
  },
  {
    Header: 'Status',
    accessor: 'isValid',
    Cell: function StatusCell (data: any) {
      return (
          <Badge fontSize="xs" colorScheme={badgeEnum[data]}>
              {returnStatus(data)}
          </Badge>
      )
    }
  }
]
