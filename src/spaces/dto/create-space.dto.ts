import { IsBoolean, IsNotEmpty, IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(5)
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsBoolean()
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  capacity: number;

  @IsNotEmpty()
  @IsNumber()
  headquarterId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
