import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { NowPlaysService } from './now-plays.service';
import { CreateNowPlayDto } from './dto/create-now-play.dto';
import { UpdateNowPlayDto } from './dto/update-now-play.dto';
import { JwtAuthGuard } from 'src/auth/security/auth.guard';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import {Request} from 'express';
import { User } from 'src/domain/user.entity';

@Controller('now-plays')
export class NowPlaysController {
  constructor(private readonly nowPlaysService: NowPlaysService) {}
 
  @Get('/all')
  findAllDto() {
    return this.nowPlaysService.getAllDto();
  }

  //#. user id로 찾기
  @Get('')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin","user")
  findExtendByUserId(@Req() req: Request) {
    const user : User = req.user as User;
    return this.nowPlaysService.findDtoByUserId(user.user_id);
  }


  //#. 추가
  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin","user")
  create(@Req() req: Request, @Body() createNowPlayDto: CreateNowPlayDto) {
    const user : User = req.user as User;
    return this.nowPlaysService.create(createNowPlayDto , user.user_id , true);
  }

  //#. 삭제
  @Delete('/:music_id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin","user")
  remove(@Req() req: Request , @Param('music_id') music_id : number) {
    const user : User = req.user as User;
    return this.nowPlaysService.remove(user.user_id ,music_id);
  } 

   
  //#. 조회
  // @Get('all')
  // findAll() {
  //   return this.nowPlaysService.getAll();
  // }

  //#. user id로 찾기
  // @Get('')
  // @UseGuards(JwtAuthGuard , RolesGuard)
  // @Roles("admin","user")
  // findByUserId(@Req() req: Request) {
  //   const user : User = req.user as User;
  //   return this.nowPlaysService.findByUserId(user.user_id);
  // }

  
}
