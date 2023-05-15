import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString({ message: 'Must be string' })
  readonly email;

  @IsString({ message: 'Must be string' })
  @Length(4, 8, { message: 'Must be between 4 and 8 characters' })
  readonly password;

  @IsString({ message: 'Must be string' })
  readonly first_name;

  @IsString({ message: 'Must be string' })
  readonly last_name;

  @IsString({ message: 'Must be string' })
  readonly phone;

  readonly age;
}
