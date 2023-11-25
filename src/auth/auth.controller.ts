import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './requestWithUser';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // signup api
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  // login api
  @UseGuards(LocalAuthGuard) // 앞으로 strategy에 서술된 passport를 사용예정의미
  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginUser(@Req() req:RequestWithUser) {
    const {user} = req
    //const user = await this.authService.loginUser(loginUserDto);
  const token = await this.authService.generateJwtAccessToken(user.id);
  return {user, token};
  }
}
