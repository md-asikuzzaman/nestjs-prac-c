import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CustomerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsString()
  @IsEmail()
  email!: string;

  @IsNumber()
  age!: number;

  @IsString()
  @MinLength(10)
  @MaxLength(15)
  address!: string;
}
