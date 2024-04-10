import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/domain/album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Music } from 'src/domain/music.entity';
import { ExtendAlbumDto } from './dto/extend-album.dto';
import { MusicsService } from 'src/musics/musics.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository : Repository<Album>,

    @InjectRepository(Music)
    private musicRepository : Repository<Music>,

    private musicService : MusicsService
  ){}

  //#. getAll
  getAll() {
    return this.albumRepository.find();
  }

  //#. findById
  findById(id : number) {
    return this.albumRepository.find(
      {
        where :{
          album_id : id
        }
      }
    );
  }

  async findExtendById(id : number) {
    var musics : Music[] = await this.musicRepository.find({where : {album_id : id}});

    var album = await this.albumRepository.findOne(
      {
        where :{
          album_id : id
        }
      }
    );
    
    var extendMusics = await this.musicService.getExtendMusicFromMusics(musics);

    return new ExtendAlbumDto(album , extendMusics);
  }

  //#. create
  create(createAlbumDto: CreateAlbumDto) {
    return this.albumRepository.insert(createAlbumDto);
  }

  //#. update
  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.createQueryBuilder().where(`album_id = ${id}`).update(updateAlbumDto).execute();
  }

  //#. delete
  remove(id: number) {
    return this.albumRepository.createQueryBuilder().where(`album_id = ${id}`).delete().execute();
  }
  

  
  findOne(id: number) {
    return `This action returns a #${id} album`;
  }

  
}
