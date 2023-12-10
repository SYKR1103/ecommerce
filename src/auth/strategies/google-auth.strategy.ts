import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { AuthService } from "../auth.service";
import { UserService } from "src/user/user.service";
import { Injectable } from "@nestjs/common";





@Injectable()
export class GoogleAuthStrategy extends PassportStrategy(
    Strategy,
    "google"
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

            return profile
        }

}