import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/create.user.schema';
import { Model } from 'mongoose';
import {
  ReffreshTokenEntity,
  SignInEntity,
  UserEntity,
} from './entities/create.user.entity';
import {
  ChangePasswordDto,
  CreateUserDto,
  ReffreshTokenDto,
  SignInDto,
} from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { ReffreshToken } from './schemas/create.reffres.token';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModal: Model<User>,
    @InjectModel(ReffreshToken.name)
    private reffresTokenModal: Model<ReffreshToken>,
    private jwtService: JwtService,
  ) {}

  async Signup(userdetails: CreateUserDto): Promise<UserEntity> {
    const { name, email, password, age } = userdetails;
    const IsUser = await this.userModal.findOne({ email: email });
    if (IsUser) {
      throw new BadRequestException('User Alrady Exist....');
    }
    let HashPassword;
    try {
      HashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      console.error(error);
    }

    const UserResult = await this.userModal.create({
      name,
      email,
      password: HashPassword,
      age,
    });

    return { name: UserResult.name, email: UserResult.email };
  }

  async SignIn(signIndto: SignInDto): Promise<SignInEntity> {
    const { email, password } = signIndto;
    const IsUser = await this.userModal.findOne({ email });

    if (!IsUser) {
      throw new BadRequestException(
        'User Is Not In our database please register first',
      );
    }

    const userCheckedPassword = await bcrypt.compare(password, IsUser.password);
    if (!userCheckedPassword) {
      throw new BadRequestException('Password Not Match');
    }

    const data = await this.CreateJwtToken(IsUser._id);

    return {
      name: IsUser.name,
      token: data.token,
      reffreshToken: data.reffreshtoken,
    };
  }

  async CreateJwtToken(userid) {
    const jwttoken = this.jwtService.sign({ userid: userid });
    const reffresh = await this.StoreReffrestoken(userid);
    return { token: jwttoken, reffreshtoken: reffresh.token };
  }

  async StoreReffrestoken(userid) {
    const reffreshtoken = uuidv4();
    const expireDate = new Date();
    const expDate = expireDate.setDate(expireDate.getDate() + 3);

    return await this.reffresTokenModal.create({
      userid,
      token: reffreshtoken,
      expiredate: expDate,
    });
  }
  async ReffreshToken(
    reffreshtokendto: ReffreshTokenDto,
  ): Promise<ReffreshTokenEntity> {
    const day = new Date();
    day.setDate(day.getDate());

    const IsToken = await this.reffresTokenModal.findOneAndDelete({
      token: reffreshtokendto.token,
    });

    if (!IsToken) {
      throw new BadRequestException('Request is forbbiden');
    }

    const reffreshdata = await this.reffresTokenModal.findOne({
      expiredate: { $gte: day },
    });

    const result = await this.CreateJwtToken(reffreshdata?.userid);

    return { token: result.token, reffreshtoken: result.reffreshtoken };
  }

  async ChangePassword(changepassworddto: ChangePasswordDto): Promise<boolean> {
    const IsEmail = await this.userModal.findOne({
      email: changepassworddto.email,
    });

    if (!IsEmail) {
      throw new BadRequestException('Email Address Is not valid...');
    }

    const passwordResult = await bcrypt.compare(
      changepassworddto.oldpassword,
      IsEmail.password,
    );
    if (!passwordResult) {
      throw new BadRequestException(
        'Old Password is not matched pleased try again',
      );
    }
    const hashPassword = await bcrypt.hash(
      changepassworddto.currentpassword,
      10,
    );

    const result = await this.userModal.updateOne(
      { email: changepassworddto.email },
      { $set: { password: hashPassword } },
    );

    return true;
  }
}
