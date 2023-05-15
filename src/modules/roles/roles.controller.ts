import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RolesService } from './roles.service';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiResponse({ status: 200, type: [Role] })
  @ApiOperation({ summary: 'Get role by value' })
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiResponse({ status: 200, type: [Role] })
  @ApiOperation({ summary: 'Get all roles' })
  @Get('/roles')
  getAll() {
    return this.rolesService.getAll();
  }
}
