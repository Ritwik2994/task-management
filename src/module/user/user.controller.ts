import { Body, Controller, Post } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ data: string }> {
    return this.userService.signUp(userCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(userCredentialsDto);
  }
}
