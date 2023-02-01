import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  Body,
  ClassSerializerInterceptor,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    // private readonly i18n: I18nService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  public async me(@Request() req: any) {
    return new req.user();
  }

  @Get('/all')
  async getAllUsers(@Query() query: any) {
    return this.usersService.GetAllUsers(query);
  }
}
