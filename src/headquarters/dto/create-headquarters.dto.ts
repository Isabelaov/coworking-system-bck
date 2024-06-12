import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateHeadquartersDto {
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  name: string;

  @IsString()
  @MaxLength(100)
  @MinLength(5)
  address: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
