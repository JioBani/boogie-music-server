import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/domain/album.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository : Repository<Album>,
  ){}

  getAll() {
    return this.albumRepository.find();
  }

  async getAllDto(){
    const albums : Album[] = await this.albumRepository.find({
      relations : ["musics", "musics.artists"]
    });

    return albums.map((album)=>AlbumDto.fromAlbum(album)); 
  }

  async findById(id : number) {
    var result = await this.albumRepository.find(
      {
        where :{
          album_id : id
        }
      }
    );

    if(!result){
      throw new NotFoundException('album not found.');
    }
    else{
      return result;
    }
  }

  async findDtoById(id : number) {
    var album = await this.albumRepository.findOne(
      {
        where :{
          album_id : id
        },
        relations : ["musics", "musics.artists"]
      }
    );

    if(!album){
      throw new NotFoundException('album not found.');
    }

    return AlbumDto.fromAlbum(album);
  }

  async findByTitle(title: string) : Promise<Album[]> {
    return this.albumRepository.find({
      where : {
        album_title : Like(`%${title}%`),
      },
    })
  }


  async findDtoByTitle(title: string) : Promise<AlbumDto[]> {
    return (await this.albumRepository.find({
      where : {
        album_title : Like(`%${title}%`),
      },
      relations : ["musics" , "musics.artists","musics.album"]
    })).map(e=>AlbumDto.fromAlbum(e));
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.insert(createAlbumDto);
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.createQueryBuilder()
    .where('album_id = :albumId',{albumId : id})
    .update(updateAlbumDto)
    .execute();
  }

  remove(id: number) {
    return this.albumRepository
      .createQueryBuilder()
      .where('album_id = :albumId',{albumId : id})
      .delete()
      .execute();
  }   
}
