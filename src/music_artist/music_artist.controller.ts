import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MusicArtistService } from './music_artist.service';
import { CreateMusicArtistDto } from './dto/create-music_artist.dto';

@Controller('music-artist')
export class MusicArtistController {
  constructor(private readonly musicArtistService: MusicArtistService) {}

  @Post()
  create(@Body() createMusicArtistDto: CreateMusicArtistDto) {
    try{
      return this.musicArtistService.create(createMusicArtistDto);
    }catch(e){
      console.log(typeof e)
      return [];
    }    
  }

  @Get()
  getAll() {
    return this.musicArtistService.getAll();
  }

  @Get('/find')
  findById(@Query('music_id') music_id?: string , @Query('artist_id') artist_id?: string){
    return this.musicArtistService.findById(+music_id,+artist_id);
  }

  @Delete()
  remove( 
    @Query('music_id') music_id: string , 
    @Query('artist_id') artist_id: string,
  )  {
    return this.musicArtistService.remove(+music_id,+artist_id);
  }
}
