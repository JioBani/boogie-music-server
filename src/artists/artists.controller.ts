import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}


    
  //#. getAll
  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get('extend/')
  getAllDto() {
    return this.artistsService.getAllDto();
  }

  //#. findById
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.artistsService.findById(+id);
  }

  //#. findById
  @Get('title/:title')
  findExtendByTitle(@Param('title') title: string) {
    console.log("title" + title);
    return this.artistsService.findDtoByTitle(title);
  }
  

  //#. findById
  @Get('extend/:id')
  findExtendById(@Param('id') id: string) {
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
}
