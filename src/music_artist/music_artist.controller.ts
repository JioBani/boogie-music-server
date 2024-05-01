import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MusicArtistService } from './music_artist.service';
import { CreateMusicArtistDto } from './dto/create-music_artist.dto';

@Controller('music-artist')
export class MusicArtistController {
  constructor(private readonly musicArtistService: MusicArtistService) {}

  @Get('all')
  getAll() {
    return this.musicArtistService.getAll();
  }

  @Get()
  findById(@Query('music_id') music_id?: string , @Query('artist_id') artist_id?: string){
    return this.musicArtistService.findById(+music_id,+artist_id);
  }

  @Post()
  create(@Body() createMusicArtistDto: CreateMusicArtistDto) {
    return this.musicArtistService.create(createMusicArtistDto);  
  }

  @Delete()
  remove( 
    @Query('music_id') music_id: string , 
    @Query('artist_id') artist_id: string,
  )  {
    return this.musicArtistService.remove(+music_id,+artist_id);
  }
}
