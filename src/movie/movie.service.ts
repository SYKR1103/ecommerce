import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Movie } from "./entities/movie.entity";
import { Repository } from "typeorm";
import { HttpService } from "@nestjs/axios";
import { array } from "@hapi/joi";
import { ConfigService } from "@nestjs/config";
import { PageOptionDto } from "../common/dtos/page-options.dto";
import { PageDto } from "../common/dtos/page.dto";
import { PageMetaDto } from "../common/dtos/page-meta.dto";

@Injectable()
export class MovieService {

  constructor(
    @InjectRepository(Movie)
    private movieRepo : Repository<Movie>,
    private readonly httpService : HttpService,
    private readonly configService : ConfigService
  ) {}



  async createMovie(){
    const {data, status} = await this.httpService.get(
      this.configService.get('TMDB_URL'),
      { headers : { Authorization: this.configService.get('TMDB_KEY')}}
    ).toPromise()

    if (status === 200) {
      const datas = data.results
      const movieData = []

      datas?.map((data) =>
        movieData.push({
          title: data["title"],
          overview: data["overview"],
          release_date: data["release_date"],
          adult: data["adult"],
          vote_average: data["vote_average"]

        })
      )
      return await this.movieRepo.save(movieData)


    }
  }


  async getAllMovies(pageOptionDto: PageOptionDto) : Promise<PageDto<Movie>> {
   // return await this.movieRepo.find()
    const querybuilder = await this.movieRepo.createQueryBuilder('movie')

    await querybuilder
      .orderBy('movie.createdAt', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take)


    const itemCount = await querybuilder.getCount()
    const {entities} = await querybuilder.getRawAndEntities()

    const pageMetaDto = new PageMetaDto({itemCount, pageOptionDto})
    return new PageDto(entities, pageMetaDto)










  }








}
