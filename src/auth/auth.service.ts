import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt.strategy';

// interface Formatlogin extends Partial<User> {
//   email: string;
// }

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: User;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // Creates a user
  async register(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'Account has been successfully created',
    };

    try {
      status.data = await this.usersService.createUser(userDto);
    } catch (e: any) {
      status = {
        success: false,
        message: e,
      };
    }

    return status;
  }

  // User Login authentication
  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByToken(loginUserDto);

    // generate token
    const token = this._createToken(user);

    return {
      ...token,
      data: user,
    };
  }

  async validateUser(payload: JwtPayload) {
    const user = await this.usersService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  // token generation
  private _createToken({ token }: any) {
    const user: JwtPayload = { token };
    const Authorization = this.jwtService.sign(user);
    return {
      expiresIn: '30 days',
      Authorization,
    };
  }
}
