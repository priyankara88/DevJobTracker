import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  age: number;
  @IsString()
  password: string;
}

export class SignInDto {
  email: string;
  password: string;
}

export class ReffreshTokenDto {
  @IsString()
  token: string;
}

export class ChangePasswordDto {
  @IsString()
  email: string;
  @IsString()
  oldpassword: string;
  @IsString()
  currentpassword: string;
}
