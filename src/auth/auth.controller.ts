import { Controller, Post, Body, UseGuards, Req ,Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth-guard';

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
  @UseGuards(LocalAuthGuard) // 앞으로 strategy에 서술된 passport(보안된 로그인)를 사용예정의미
  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  async loginUser(@Req() req:RequestWithUser) {
    const {user} = req
    //const user = await this.authService.loginUser(loginUserDto);
  const token = await this.authService.generateJwtAccessToken(user.id);
  return {user, token};
  }


  // 사용권한이 있는 애들만 정보갖고오게 하는거
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() req:RequestWithUser) {
    return req.user;
  }






}
