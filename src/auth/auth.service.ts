import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  //회원가입 비지니스 로직
  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //로그인 비즈니스 로직
}
