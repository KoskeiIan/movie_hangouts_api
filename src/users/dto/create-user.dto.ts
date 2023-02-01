import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class LoginUserDto {
  @ApiProperty()
  readonly email: string;
  
  @ApiProperty()
  readonly password: string;
}

export class CreateUserDto extends User {}

export class UpdatePasswordDto {
  @ApiProperty()
  new_password: string;

  @ApiProperty()
  old_password: string;
}
