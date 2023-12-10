import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(100)
    title : string


    @IsString()
    @IsNotEmpty()
    desc : string




}
