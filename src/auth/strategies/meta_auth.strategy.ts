import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy} from "passport-facebook";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Provider } from "src/user/entities/provider.enum";





@Injectable()
export class MetaAuthStrategy extends PassportStrategy(
    Strategy,
    Provider.META
    ) {
        constructor(
            private readonly configService : ConfigService,
            private readonly authService : AuthService,
            private readonly userService : UserService,
        ) {
            super({

                clientID: configService.get('META_AUTH_CLIENTID'),
                clientSecret: configService.get('META_AUTH_CLIENT_SECRET'),
                callbackURL : configService.get('META_AUTH_CALLBACK_URL'),
                profileFields: ['emails', 'name']
            })
        }


        async validate(
            _accessToken : string,
            _refreshToken : string,
            profile : Profile,
            done : any,
        ) : Promise<any> {

            const {name, emails} = profile
            const email = emails[0].value
            const nickname =name.familyName+ name.givenName 
            const provider = Provider.META
            console.log(email)
            try {

                const user = await this.userService.findUserByEmail(email)
                if (user.provider !== provider) {
                    console.log(user.provider, provider)
                    throw new HttpException('xxx', HttpStatus.CONFLICT)
                } 

                done(null, user)


            } catch(e) {

                if (e.status === 404) {

                    const newuser = await this.userService.createUser({
                        email,
                        nickname,
                        provider : Provider.META
                    })
                    done(null, newuser)
                }

            }  

        }

    }
