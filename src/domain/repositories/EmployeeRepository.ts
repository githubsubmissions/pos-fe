import Employee from "../entities/Employee";
import {AddEditEmployeeRequest} from "../requests/AddEditEmployeeRequest";

export default interface EmployeeRepository {

  addEmployee(employeeDetails: AddEditEmployeeRequest): Promise<Employee>;

  updateEmployee(employeeDetails: AddEditEmployeeRequest): Promise<Employee>;

  getEmployee(email: string): Promise<Employee>;

  getAllEmployees(): Promise<Employee[]>;

  getLoginEmployees(): Promise<Employee[]>;

  resetPassword(email: string): Promise<boolean>;

  resetMyPassword(payload: { oldPassword: string; newPassword: string }): Promise<boolean>;
}