import { Injectable } from '@nestjs/common';
import mockMatrix from './mock/matrix.mock.json'
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload { username: string; }

@Injectable()
export class AppService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  getMatrix(value: number): any {
    for (let i = 0; i < mockMatrix.length; i++) {
      for (let j = 0; j < mockMatrix[i].length; j++) {
        if (mockMatrix[i][j] === value) return { data: `(${i}, ${j})` }; // Linear time: O(n)
      }
    }

    return {
      data: false
    };
  }

  async login(username: string, password: string): Promise<any> {
    // find user in db    
    const user = await this.usersService.findByLogin(username, password);

    // generate and sign token    
    const token = this._createToken(user);

    return {
      token
    };
  }

  private _createToken({ username }): any {
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return accessToken;
  }
}
