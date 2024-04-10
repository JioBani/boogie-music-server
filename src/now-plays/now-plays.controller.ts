import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NowPlaysService } from './now-plays.service';
import { CreateNowPlayDto } from './dto/create-now-play.dto';
import { UpdateNowPlayDto } from './dto/update-now-play.dto';

@Controller('now-plays')
export class NowPlaysController {
  constructor(private readonly nowPlaysService: NowPlaysService) {}
  
  //#. 조회
  @Get()
  findAll() {
    return this.nowPlaysService.getAll();
  }

  //#. user id로 찾기
  @Get(':user_id')
  findByUserId(@Param('user_id') user_id: string) {
    return this.nowPlaysService.findByUserId(user_id);
  }

  //#. user id로 찾기
  @Get('extend/:user_id')
  findExtendByUserId(@Param('user_id') user_id: string) {
    return this.nowPlaysService.findExtendByUserId(user_id);
  }


  //#. 추가
  @Post()
  create(@Body() createNowPlayDto: CreateNowPlayDto) {
    return this.nowPlaysService.create(createNowPlayDto);
  }

  //#. 삭제
  @Delete()
  remove(@Query('user_id') user_id : string , @Query('music_id') music_id : number) {
    return this.nowPlaysService.remove(user_id ,music_id);
  } 
}
