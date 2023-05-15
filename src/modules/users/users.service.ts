import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './models';
import { UserDto } from './dto';
import { Logger } from '../../shared/services';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private logger: Logger,
    private roleService: RolesService,
  ) {}

  async createUser(dto: UserDto) {
    const user = await this.userRepository.create(dto);
    // const role = await this.roleService.getRoleByValue('ADMIN');
    // await user.$set('roles', [role.id]);
    // user.roles = [role];

    this.logger.log(`UsersService.createUser: ${JSON.stringify(user)}`);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });

    this.logger.log(`UsersService.getUserByEmail: ${JSON.stringify(user)}`);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    this.logger.log(`UsersService.getAllUsers: ${JSON.stringify(users)}`);

    return users;
  }
}
