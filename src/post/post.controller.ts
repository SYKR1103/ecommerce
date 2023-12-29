import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser';
import { PageOptionDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PostEntity } from './entities/post.entity';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Req() req:RequestWithUser,
  @Body() CreatePostDto:CreatePostDto) { 
    return await this.postService.createPost(CreatePostDto, req.user)

   }
 
   // 8개 등록하기

   //전체 불러오기
   @Get("all")
   async getPosts(@Query() pageoptiondto:PageOptionDto 

   ) :Promise<PageDto<PostEntity>> { 
    return await this.postService.getPosts(pageoptiondto)
 
   }


   //상세 불러오기
   @Get(":id")
   async getAllpost(@Param("id") id:string) {
    return await this.postService.getOneById(id)
  }


}
