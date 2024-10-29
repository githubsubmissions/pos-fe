import AuthRepository from "../../domain/repositories/AuthRepository";
import apiClient, {updateApiClientHeaders} from "../utils/ApiClient";


class AuthRepositoryImpl implements AuthRepository {
  async login(payload: { email: string; password: string }): Promise<null | string> {
    const response = await apiClient.post(`/auth/login/`, payload);
    const token = response.data.token;

    if (token) {
      updateApiClientHeaders({
        Authorization: `Bearer ${token}`,
      });
      // apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
      localStorage.setItem('email', payload.email)
    }
    return token;
  }

  async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.clear();
    updateApiClientHeaders({});
  }
}

export default AuthRepositoryImpl;