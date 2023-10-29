import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async findAll(@Query('page') page): Promise<Post[]> {
    console.log(page);
    return this.postsService.findAll();
  }
}
