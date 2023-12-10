import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Provider } from "src/user/entities/provider.enum";





@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
    Strategy,
    Provider.GOOGLE
    ) {
        constructor(
            private readonly configService : ConfigService,
            private readonly authService : AuthService,
            private readonly userService : UserService,
        ) {
            super({

                clientID: configService.get('GOOGLE_AUTH_CLIENTID'),
                clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
                callbackURL : configService.get('GOOGLE_AUTH_CALLBACK_URL'),
                scope : ['profile', 'email'],
            })
        }


    
        async validate(
            _accessToken : string,
            _refreshToken : string,
            profile : any,
            done : VerifyCallback
        ) : Promise<any> {

            const {displayName, email, provider, picture } = profile

            // 1.해당 email로 존재여부 
            // 2. email이 없으면 회원가입처리
            // 3. email이 있고, provider가 다르면 에러표시 
            // 4. email이 있고, provider가 같으면 로그인처리


            try {

                const user = await this.userService.findUserByEmail(email)

                if (user.provider !== provider) {
                    console.log(user.provider, provider)
                    //done(`you are already subscribed to ${user.provider}`, HttpStatus.CONFLICT)
                    throw new HttpException(`you are already subscribed to ${user.provider}`, HttpStatus.CONFLICT)
                    
                }




                done(null,user)

            } catch(e) {
                if (e.status === 404) {

                    //회원가입
                    const newUser = await this.userService.createUser({
                        email,
                        nickname : displayName,
                        provider,
                        profileImg: picture,

                    })
                    done(null, newUser)

                
                }

            }

        }

}