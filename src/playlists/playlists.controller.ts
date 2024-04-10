import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  //#. getAll
  @Get('')
  getAll() {
    return this.playlistsService.getAll();
  }

  @Get(':id')
  getPlaylistExtend(@Param('id') id: string) {
    return this.playlistsService.getExtendPlaylist(+id);
  }

  //#. 유저 id로 플레이리스트 찾기
  @Get('/user/:id')
  getPlaylistByUserId(@Param('id') id: string) {
    return this.playlistsService.findByUserId(id);
  }  

  @Get('/id/extend/:id')
  getPlaylistExtendByPlaylistId(@Param('id') id: string) {
    return this.playlistsService.getExtendPlaylist(+id);
  }  

  //#. 플레이리스트 추가
  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto) {
    return this.playlistsService.create(createPlaylistDto);
  }

  //#. 플레이리스트 삭제
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistsService.remove(+id);
  }  
  //#. 플레이리스트 수정
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.updateByPlaylistId(+id, updatePlaylistDto);
  } 
}
