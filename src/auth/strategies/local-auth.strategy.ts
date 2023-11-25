import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/user/entities/user.entity";



@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {

 constructor(private authservice : AuthService) {

    super({
        usernameField : 'email',
    })
 }

 async validate(email:string, password:string) : Promise<User> {
    return await this.authservice.loginUser({email, password})
 }

 //@Body() loginUserDto: LoginUserDto을 대신해서 서술됨



}
