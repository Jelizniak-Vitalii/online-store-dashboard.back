import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users';
import { Logger } from '../../shared/services';
import { User } from '../users/models';
import { UserDto } from '../users/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly logger: Logger,
  ) {}

  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);

    this.logger.log(`User ${user.email} was logged in`);
    return this.generateToken(user);
  }

  async registration(userDto: UserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.usersService.createUser({
      ...userDto,
      age: Number(userDto?.age),
      password: hashPassword,
    });

    this.logger.log(`User ${user.email} was created`);
    return this.generateToken(user);
  }

  private async validateUser(userDto: UserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user?.password ?? '',
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
