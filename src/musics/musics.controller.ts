import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { get } from 'http';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  //#. getAll
  @Get()
  getAll() {
    return this.musicsService.getAll();
  }

  @Get('/extend')
  getAllDto() {
    return this.musicsService.getAllDto();
  }

  //#. findByMusicId  
  @Get(':id')
  findByMusicId(@Param('id') id: string) {
    return this.musicsService.findByMusicId(+id);
  }

  @Get('extend/:id')
  findDtoByMusicId(@Param('id') id: string) {
    return this.musicsService.findDtoByMusicId(+id);
  }
  
  //#. findByTitle
  @Get('title/:title')
  async findByTitle(@Param('title') title: string){
    return this.musicsService.findByTitle(title);
    //return title;
  }

  @Get('title/extend/:title')
  async findDtoByTitle(@Param('title') title: string){
    return this.musicsService.findDtoByTitle(title);
    //return title;
  }

  //#. add 
  @Post()
  create(@Body() createMusicDto: CreateMusicDto) {
    return this.musicsService.create(createMusicDto);
  }

  //#. update  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicsService.update(+id, updateMusicDto);
  }

  //#. delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicsService.remove(+id);
  }

  @Post('streaming/:music_id')
  incrementStreamingCount(@Param('music_id') music_id: string) {
    return this.musicsService.incrementStreamingCount(+music_id);
  }

  @Get('extend/artist/:id')
  findByArtistId(@Param('id') artistId: string) {
    return this.musicsService.findMusicDtoByArtistId(+artistId);
  }

  //#. artist
  // @Get('artist')
  // getArtsits(@Query('music_id') music_id: string) {
  //   return this.musicsService.getArtistsByMusicId(+music_id);
  //   //return title;
  // }  

}
