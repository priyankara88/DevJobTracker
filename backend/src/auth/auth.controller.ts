import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInEntity, UserEntity } from './entities/create.user.entity';
import {
  ChangePasswordDto,
  CreateUserDto,
  ReffreshTokenDto,
  SignInDto,
} from './dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('SignUp')
  async SignUp(@Body() creteuserdto: CreateUserDto): Promise<UserEntity> {
    return this.authService.Signup(creteuserdto);
  }

  @Post('SignIn')
  async SignIn(@Body() signInDto: SignInDto): Promise<SignInEntity> {
    return this.authService.SignIn(signInDto);
  }

  @Post('Refresh-token')
  async ReffreshToken(@Body() reffreshtokendto: ReffreshTokenDto) {
    return this.authService.ReffreshToken(reffreshtokendto);
  }

  @Post('change-password')
  async Changepassword(@Body() changepassworddto: ChangePasswordDto) {
    return this.authService.ChangePassword(changepassworddto);
  }
}
