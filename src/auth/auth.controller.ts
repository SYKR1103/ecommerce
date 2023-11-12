import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup api
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  // login api
  @Post('/login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.loginUser(loginUserDto);
    const token = await this.authService.generateJwtAccessToken(user.id);
    return token;
  }
}
