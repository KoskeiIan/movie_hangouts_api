import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  profile_pic: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  token: string;
}
