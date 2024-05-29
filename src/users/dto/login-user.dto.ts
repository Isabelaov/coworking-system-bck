import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MaxLength(100)
  usernameOrEmail: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
