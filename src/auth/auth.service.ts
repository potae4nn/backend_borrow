import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<User[]> {
    const user = await this.userService.findByUsername(username);
    if (user[0]) {
      const isMatch = await bcrypt.compare(pass, user[0].password);
      if (isMatch) {
        return user;
      }
      return null;
    }
  }

  async login(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      fname: user.fname,
      lname: user.lname,
    };
    return {
      user: payload,
      access_token: this.jwtService.sign(payload),
    };
  }
}
