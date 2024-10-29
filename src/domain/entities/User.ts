import UserRole from "./UserRole";

interface User {
  id?: number,
  email?: string,
  firstname?: string,
  lastname?: string,
  username?: string,
  password?: string,
  status?: string,
  enabled?: boolean,
  accountNonExpired?: boolean,
  accountNonLocked?: boolean,
  credentialsNonExpired?: boolean,
  locked?: boolean,
  telephone?: string,
  userRoleDo?: UserRole,
  verified?: boolean
}

export default User;
