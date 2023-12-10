import { Controller, Post, Body, UseGuards, Req ,Get, HttpStatus} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { NaverAuthGuard } from './guards/naver-auth.guard';
import { MetaAuthGuard } from './guards/meta_auth.guard';

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

  // 이메일 전송 API
  @Post("/email/send")
  async sendEmailVerification(@Body("email") email:string) {
    return await this.authService.sendEmailVerification(email)
  }


  // 이메일 인증번호 확인 API
  @Post("/email/check")
  async checkEmailVerification(@Body("email") email:string, @Body("code") code:string) {
    //return await this.authService.sendEmailTest(email)
    return await this.authService.checkedGenerateNumber(email, code)

  }

  //구글 로그인
  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() : Promise<any> {
    return HttpStatus.OK
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleLoginCallback(@Req() req:RequestWithUser) : Promise<any> {
    const {user} = req
    const token = await this.authService.generateJwtAccessToken(user.id)
    return {user, token}
  }

  //카카오 로그인
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin() : Promise<any> {
    return HttpStatus.OK
  }

  @Get('kakao/callback')
  @UseGuards(KakaoAuthGuard)
  async kakaoLoginCallback(@Req() req:RequestWithUser) : Promise<any> {
    const {user} = req
    return user
    //const token = await this.authService.generateJwtAccessToken(user.id)
    //return {user, token}
  }

  //네이버 로그인
  @Get('naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin() : Promise<any> {
    return HttpStatus.OK
  }

  @Get('naver/callback')
  @UseGuards(NaverAuthGuard)
  async naverLoginCallback(@Req() req:RequestWithUser) : Promise<any> {
    const {user} = req
    //return user
    const token = await this.authService.generateJwtAccessToken(user.id)
    return {user, token}
  }

  //메타 로그인
  @Get('meta')
  @UseGuards(MetaAuthGuard)
  async metaLogin() : Promise<any> {
    return HttpStatus.OK
  }

  @Get('meta/callback')
  @UseGuards(MetaAuthGuard)
  async metaLoginCallback(@Req() req:RequestWithUser) : Promise<any> {
    const {user} = req
    //return user
    const token = await this.authService.generateJwtAccessToken(user.id)
    return {user, token}
  }





}
