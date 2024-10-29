import Employee from '../../domain/entities/Employee';
import EmployeeRepository from "../../domain/repositories/EmployeeRepository";
import {AddEditEmployeeRequest} from "../../domain/requests/AddEditEmployeeRequest";
import apiClient from '../utils/ApiClient';

const employeeRootSegment = 'employee';

class EmployeeRepositoryImpl implements EmployeeRepository {
  async addEmployee(employeeRequest: AddEditEmployeeRequest): Promise<Employee> {
    const employeeData = await apiClient.post(`/${employeeRootSegment}/add`, employeeRequest);
    return employeeData.data;
  }

  async updateEmployee(employeeRequest: AddEditEmployeeRequest): Promise<Employee> {
    const employeeData = await apiClient.post(`/${employeeRootSegment}/edit`, employeeRequest);
    return employeeData.data;
  }

  async getEmployee(email: string): Promise<Employee> {
    const employeeData = await apiClient.get(`/${employeeRootSegment}/fetch/${email}`);
    return employeeData.data;
  }

  async getAllEmployees(): Promise<[Employee]> {
    const employeesData = await apiClient.get(`/${employeeRootSegment}/fetchAll`);
    return employeesData.data;
  }

  async getLoginEmployees(): Promise<[Employee]> {
    const employeesData = await apiClient.get(`/${employeeRootSegment}/loginFetchAll`);
    return employeesData.data;
  }

  async resetPassword(email: string): Promise<boolean> {
    const payload = {email: email};
    const employeesData = await apiClient.get(`/${employeeRootSegment}/resetEmployeePassword`, {params: payload});
    return employeesData.data;
  }

  async resetMyPassword(payload: { oldPassword: string; newPassword: string }): Promise<boolean> {
    const employeesData = await apiClient.get(`/${employeeRootSegment}/resetMyPassword`, {params: payload});
    return employeesData.data;
  }
}

export default EmployeeRepositoryImpl;
