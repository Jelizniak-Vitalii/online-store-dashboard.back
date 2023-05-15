import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User, UserRoles } from '../users/models';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  // @ApiProperty({ example: '1', description: 'Unique role id' })
  // @Column({
  //   type: DataType.INTEGER,
  //   unique: true,
  //   allowNull: false,
  //   primaryKey: true,
  // })
  // role_id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Unique role value' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: 'Administrator', description: 'Description role' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
