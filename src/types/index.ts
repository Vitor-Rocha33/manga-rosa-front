export interface IEmployeesResponse {
  id: string,
  name: string
  email: string,
  isValid: boolean,
  cpf: string,
  cellPhone: string,
  knowledge: IKnowledge[]
}

export interface IKnowledge {
  name: string
}