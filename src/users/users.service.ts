import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      username: 'john',
      password: 'Th3password',
    }
  ];

  async findByLogin(username: string, password: string): Promise<User | undefined> {
    const user = this.users.find(user => user.username === username);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);    
    }

    // compare passwords    
    const areEqual = user.password === password;
    
    if (!areEqual) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);    
    }

    return user;
  }
}