import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDtoParametersInterface } from "src/auth/interfaces/page-meta-dto-parameters.interface";




export class PageMetaDto {

    @ApiProperty()
    readonly page : number

    @ApiProperty()
    readonly take : number

    @ApiProperty()
    readonly itemCount : number

    @ApiProperty()
    readonly pageCount : number 

    @ApiProperty()
    readonly hasPreviousPage : boolean

    @ApiProperty()
    readonly hasNextPage : boolean


    constructor({pageOptionDto, itemCount} : PageMetaDtoParametersInterface) {

        this.page = pageOptionDto.page;
        this.take = pageOptionDto.take;
        this.itemCount = itemCount
        this.pageCount = Math.ceil(this.itemCount/this.take)
        this.hasPreviousPage = this.page >1 
        this.hasNextPage = this.page < this.pageCount


    }

}