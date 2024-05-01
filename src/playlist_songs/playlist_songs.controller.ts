import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req} from '@nestjs/common';
import { PlaylistSongsService } from './playlist_songs.service';
import { CreatePlaylistSongDto } from './dto/create-playlist_song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist_song.dto';
import { JwtAuthGuard } from 'src/auth/security/auth.guard';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { User } from 'src/domain/user.entity';
import { Request, Response } from 'express';


@Controller('playlist-songs')
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}

  //#. 조회
  @Get('/all')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin")
  getAll(@Req() req: Request) {
    return this.playlistSongsService.findAll();
  }

  //#. 찾기
  @Get(':playlist_id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin","user")
  findByPlaylistId(
    @Req() req: Request,
    @Param('playlist_id') playlist_id: string , 
  ) {
    const user : User = req.user as User;
    return this.playlistSongsService.findByPlaylistId(+playlist_id , user.user_id , true);
  }

  //#. 추가
  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin","user")
  create(@Req() req: Request,@Body() createPlaylistSongDto : CreatePlaylistSongDto) {
    const user : User = req.user as User;
    return this.playlistSongsService.create(createPlaylistSongDto,user.user_id , true);
  }

  //#. 삭제
  @Delete('')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles("admin","user")
  remove(@Req() req: Request, @Body() createPlaylistSongDto : CreatePlaylistSongDto) {
    const user : User = req.user as User;
    return this.playlistSongsService.remove(
      createPlaylistSongDto.playlist_id,
      createPlaylistSongDto.music_id,
      user.user_id,
      true
    );
  } 
}
