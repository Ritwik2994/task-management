import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    userCredientialsDto: UserCredentialsDto,
  ): Promise<{ data: string }> {
    return this.userRepository.createUser(userCredientialsDto);
  }

  async signIn(
    userCredientialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = userCredientialsDto;
    const user = await this.userRepository.findOne({ email });
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check user credentials');
    }
    // return this.userRepository.checkUser(userCredientialsDto);
  }
}
