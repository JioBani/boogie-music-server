import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get('/all')
  getAllDto() {
    return this.artistsService.getAllDto();
  }

  @Get()
  findDtoByTitle(@Query('title') title: string) {
    return this.artistsService.findDtoByTitle(title);
  }
  

  @Get(':id')
  findDtoById(@Param('id') id: string) {
    return this.artistsService.findDtoById(+id);
  } 

  //#. create
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  //#. update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(+id, updateArtistDto);
  }

  //#. delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove(+id);
  }

 
    
  //#. getAll
  // @Get()
  // getAll() {
  //   return this.artistsService.getAll();
  // }

 
  //#. findById
  // @Get(':id')
  // findById(@Param('id') id: string) {
  //   return this.artistsService.findById(+id);
  // }

}
