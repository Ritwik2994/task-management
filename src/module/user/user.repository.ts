import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(
    userCredentialsDto: UserCredentialsDto,
  ): Promise<{ data: string }> {
    const { email, name, password } = userCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ email, name, password: hashedPassword });

    try {
      await this.save(user);
      return { data: 'user saved successfully' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // async checkUser(
  //   userCredientialsDto: UserCredentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   const { username, password } = userCredientialsDto;
  //   const user = await this.findOne({ username });
  //   console.log(user);
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     const payload: JwtPayload = { username };
  //     const accessToken: string = await this.jwtService.sign(payload);
  //     return { accessToken };
  //   } else {
  //     throw new UnauthorizedException('Please check user credentials');
  //   }
  // }
}
