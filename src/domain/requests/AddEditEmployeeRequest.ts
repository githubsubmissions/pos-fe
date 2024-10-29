export interface AddEditEmployeeRequest {
  email: string,
  employeeId: string,
  firstname: string,
  lastname: string,
  status: "DELETED",
  telephone: string,
  userRole: {
    id: number
  }
}

