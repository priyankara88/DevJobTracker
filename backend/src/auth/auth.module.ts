import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/create.user.schema';
import { ConfigModule } from '@nestjs/config';
import {
  ReffreshToken,
  RffreshtokenSchema,
} from './schemas/create.reffres.token';
import { AuthGuard } from 'src/gurad/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ResetToken, ResetTokenSchema } from './schemas/create.reset.token';
import { MailService } from 'src/services/mail.services';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: ReffreshToken.name,
        schema: RffreshtokenSchema,
      },
      {
        name: ResetToken.name,
        schema: ResetTokenSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    MailService,
  ],
})
export class AuthModule {}
