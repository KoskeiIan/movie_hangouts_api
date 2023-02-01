import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';

export interface FormatLogin extends Partial<User> {
  token: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //   Get Single User
  async findUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  // Get All Users
  async GetAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  // Create Single User
  async createUser(userDto: CreateUserDto): Promise<User> {
    // Check is user exists
    const userInDb = await this.prisma.user.findUnique({
      where: { email: userDto.email },
    });

    if (userInDb) {
      throw new HttpException('user_already_exists', 400, {
        cause: new Error('user_already_exists'),
      });
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    return this.prisma.user.create({
      data: {
        ...userDto,
        password: hashedPassword,
      },
    });
  }

  // Used by auth module to login user
  async findByToken({ email, password }: LoginUserDto): Promise<FormatLogin> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('Invalid creadentials', HttpStatus.UNAUTHORIZED);
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: p, ...result } = user;
    return result;
  }

  // Used by auth module to get user in database
  async findByPayload({ email }: any): Promise<any> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  //   Update User Details
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    return this.prisma.user.update({
      data,
      where,
    });
  }

  //   Delete Single User
  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
