

import {Injectable} from'@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { Provider } from 'src/user/entities/provider.enum';





@Injectable()
export class KakaoAuthStrategy extends PassportStrategy(
    Strategy,
    Provider.KAKAO
    ) {
        constructor (
            private readonly configService : ConfigService,
        ) {
            super({
                clientID : configService.get('KAKAO_AUTH_CLIENTID'),
                callbackURL : configService.get('KAKAO_AUTH_CALLBACK_URL')
            })
        }


        async validate(
            accessToken : string,
            refreshToken : string,
            profile : any,
            done : any,
        ) : Promise<any> {

            return profile

        }

        



    }
