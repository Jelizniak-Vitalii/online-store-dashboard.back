import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto';
import { AuthService } from './auth.service';
import { ApiResponseInterceptor } from '../../shared/interceptors/api-response.interceptor';
import { UserDto } from '../users/dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ApiResponseInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  async registration(@Body() userDto: UserDto) {
    return this.authService.registration(userDto);
  }
}
