import User from "./User";

interface Employee {
  id?: number,
  name?: string,
  email: string,
  deloop_user_id: string
  employeeId: string,
  createdAt?: string, //= "2022-12-11T20:41:32.420Z";
  updatedAt?: string, //= "2022-12-11T20:41:32.420Z";
  userDo: User

}

export default Employee;
