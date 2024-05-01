import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { get } from 'http';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  
  @Get('/all')
  getAllDto() {
    return this.musicsService.getAllDto();
  }

  @Get()
  findDto(@Query('title') title: string, @Query('artist_id') artistId: string){
    if (title && artistId) {
      throw new BadRequestException('Cannot search by both title and artist_id at the same time.');
    } else if (title) {
      return this.musicsService.findDtoByTitle(title);
    } else if (artistId) {
      return this.musicsService.findDtoByArtistId(+artistId);
    } else {
      throw new BadRequestException('No search criteria provided. Please specify a title or an artist_id.');
    }
  }
 

  @Get(':id')
  findDtoByMusicId(@Param('id') id: string) {
    return this.musicsService.findDtoByMusicId(+id);
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

  
  //#. getAll
  // @Get()
  // getAll() {
  //   return this.musicsService.getAll();
  // }   

  //#. findByMusicId  
  // @Get(':id')
  // findByMusicId(@Param('id') id: string) {
  //   return this.musicsService.findByMusicId(+id);
  // }

    //#. findByTitle
  // @Get('')
  // async findByTitle(@Query('title') title: string){
  //   return this.musicsService.findByTitle(title);
  //   //return title;
  // }


  // @Get('')
  // findByArtistId(@Param('id') artistId: string) {
  //   return this.musicsService.findDtoByArtistId(+artistId);
  // }

  //#. artist
  // @Get('artist')
  // getArtsits(@Query('music_id') music_id: string) {
  //   return this.musicsService.getArtistsByMusicId(+music_id);
  //   //return title;
  // }  

}
