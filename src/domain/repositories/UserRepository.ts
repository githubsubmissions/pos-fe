import User from '../../domain/entities/User';

interface UserRepository {
  getUser(userId: number): Promise<User>

  updateUser(user: User): Promise<void>
}

export default UserRepository;
