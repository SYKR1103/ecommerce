import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilder, Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/entities/user.entity';
import { PageOptionDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';


@Injectable()
export class PostService {
 

  constructor(
    @InjectRepository(PostEntity)
    private postRepo : Repository<PostEntity>
  ) {}

  async createPost(c:CreatePostDto, user:User) {
    const newPost = await this.postRepo.create({
      ...c,
     author : user
    })
    await this.postRepo.save(newPost)
    return newPost
  }

  async getPosts(pageOptionDto:PageOptionDto) : Promise<PageDto<PostEntity>> {
    const quereyBuilder =
      await this.postRepo.createQueryBuilder('post')
    await quereyBuilder.
    orderBy('post.createdAt', pageOptionDto.order).
    skip(pageOptionDto.skip).
    take(pageOptionDto.take)

    const itemCount = await quereyBuilder.getCount()
    const {entities} = await quereyBuilder.getRawAndEntities()
    

    const pageMetaDto =
      new PageMetaDto({itemCount, pageOptionDto})
    return new PageDto(entities, pageMetaDto)

  }


  async getOneById(id:string) {
    const onepost = this.postRepo.findOneBy({id})
    if (!onepost) throw new HttpException("xxxxx", HttpStatus.NOT_FOUND)
    return onepost
  }

  async updateOneById(id: string, c:CreatePostDto) {
    const updatedpost = await this.postRepo.update(id, c)
    if (!updatedpost) throw new HttpException("xxxxx", HttpStatus.NOT_FOUND)
    return updatedpost
  }
  
  async deletePost(id:string) {
    const deleteresponse = await this.postRepo.delete(id)
    if (!deleteresponse.affected) throw new HttpException("xxxxx", HttpStatus.NOT_FOUND)
  }


}
