import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from "class-validator";
import { Provider } from "../entities/provider.enum";

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  //최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자 :
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)
  password?: string;


  provider?: Provider;
  profileImg?: string;
}
