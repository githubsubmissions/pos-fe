import User from '../../domain/entities/User';
import UserRepository from "../../domain/repositories/UserRepository";
import apiClient from "../utils/ApiClient";

class UserRepositoryImpl implements UserRepository {
  async getUser(userId: number): Promise<User> {
    const userData = await apiClient.get(`/users/${userId}`);
    return userData.data;
  }

  async updateUser(user: User): Promise<void> {
    if (!user) {
      return;
    }
    await apiClient.post(`/users/${""}`, user);
  }
}

export default UserRepositoryImpl;
