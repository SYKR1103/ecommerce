import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Provider } from "src/user/entities/provider.enum";




@Injectable()
export class MetaAuthGuard extends AuthGuard(Provider.META) {}