import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { VerifyCallback, Profile } from "passport-naver";
import { Strategy } from "passport-naver";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Provider } from "src/user/entities/provider.enum";
import { UserService } from "src/user/user.service";

@Injectable()

export class NaverAuthStrategy extends PassportStrategy(
    Strategy,
    Provider.NAVER) {

        constructor(
            private readonly configService : ConfigService,
            private readonly userService : UserService
        ) {

            super({

                clientID: configService.get('NAVER_AUTH_CLIENTID'),
                clientSecret : configService.get('NAVER_AUTH_CLIENT_SECRET'),
                callbackURL : configService.get('NAVER_AUTH_CALLBACK_URL'),
            })
        }

        async validate(
            accessToken : string,
            refreshToekn : string,
            profile : Profile,
            done:VerifyCallback

        ) : Promise<any> {
            const {provider} = profile
            const {email, nickname, profile_image} = profile._json

            try {

                const user = await this.userService.findUserByEmail(email)
                if ( user.provider !== provider ) {
                    console.log(user.provider, provider)
                    // 이거는 에러코드 401
                    throw new HttpException('xxxxx', HttpStatus.CONFLICT)
                }


                done(null, user)

            } catch(e) {
                // 미존재하면 에러코드 : 404
                if (e.status === 404 ) {

                    const newuser = await this.userService.createUser({
                        email,
                        nickname,
                        provider,
                        profileImg : profile_image

                    })
                    done(null, newuser)
                }

            }



        }




}