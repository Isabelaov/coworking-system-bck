import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  name: string;

  @IsNumber()
  @Min(1)
  capacity: number;
  headquarterId: number;
  userId: number;
}
