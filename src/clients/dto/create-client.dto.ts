import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(5)
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+[1-9]\d{1,14}$/, {
    message: 'Phone number must be in E.164 format',
  })
  phone: string;

  @IsString()
  @MinLength(5)
  @MaxLength(50)
  idType: string;

  @IsString()
  @MinLength(5)
  @MaxLength(250)
  identification: string;

  @IsEmail()
  @MinLength(6)
  @MaxLength(100)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(150)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsDate()
  birthDate: string;
}
