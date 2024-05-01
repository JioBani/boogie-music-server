import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  
  //#. getAll
  @Get('/all')
  getAll() {
    return this.albumsService.getAll();
  }   

  //#. findDtoById
  @Get(':id')
  findExtendbyId(@Param('id') id: string) {
    return this.albumsService.findDtoById(+id);
  }
  
  //#. findDtoByTitle
  @Get()
  findExtendbyTitle(@Query('title') title: string) {
    return this.albumsService.findDtoByTitle(title);
  }

  //#. create
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  //#. update
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(+id, updateAlbumDto);
  }

  //#. delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumsService.remove(+id);
  }   
}
