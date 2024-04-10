import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlaylistSongsService } from './playlist_songs.service';
import { CreatePlaylistSongDto } from './dto/create-playlist_song.dto';
import { UpdatePlaylistSongDto } from './dto/update-playlist_song.dto';

@Controller('playlist-songs')
export class PlaylistSongsController {
  constructor(private readonly playlistSongsService: PlaylistSongsService) {}


  //#. 조회
  @Get()
  getAll() {
    return this.playlistSongsService.getAll();
  }

  //#. 찾기
  @Get(':playlist_id')
  findByPlaylistId(
    @Param('playlist_id') playlist_id: string , 
  ) {
    return this.playlistSongsService.findByPlaylistId(+playlist_id);
  }

  //#. 추가
  @Post()
  create(@Body() createPlaylistSongDto : CreatePlaylistSongDto) {
    return this.playlistSongsService.create(createPlaylistSongDto);
  }

  //#. 변경
  @Patch()
  update(
    @Query('playlist_id') playlist_id: string , 
    @Query('music_id') music_id: string, 
    @Body() updatePlaylistSongDto: UpdatePlaylistSongDto
  ) {
    return this.playlistSongsService.update(+playlist_id, +music_id,updatePlaylistSongDto);
  }

  //#. 삭제
  @Delete('')
  remove(@Query('playlist_id') playlist_id: string , @Query('music_id') music_id: string) {
    return this.playlistSongsService.remove(+playlist_id,+music_id);
  } 
}
