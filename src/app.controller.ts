import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { User as UserModel } from '@prisma/client';
import { UsersService } from './users/users.service';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  // @Post('user/register')
  // // @ApiBody()
  // async signupUser(
  //   @Body()
  //   userData: {
  //     name: string;
  //     email: string;
  //     phone: string;
  //     password: string;
  //     profile_pic: string;
  //     username: string;
  //   },
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req: any): any {
  //   return req.user;
  // }
}
