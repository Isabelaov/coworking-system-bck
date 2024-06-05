import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { Headquarter } from 'src/headquarters/entities/headquarters.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateSpaceDto {
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  name: string;

  @IsNumber()
  @Min(1)
  capacity: number;
  headquarter: Headquarter;
  user: User;
}
