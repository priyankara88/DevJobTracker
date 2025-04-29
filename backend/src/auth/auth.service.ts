import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/create.user.schema';
import { Model } from 'mongoose';
import { SignInEntity, UserEntity } from './entities/create.user.entity';
import { CreateUserDto, SignInDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModal: Model<User>,
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

    const jwt = await this.CreateJwtToken(IsUser._id);
    console.log('jwt', jwt);

    return { name: IsUser.name };
  }

  async CreateJwtToken(userid) {
    return this.jwtService.sign({ userid: userid });
  }
}
