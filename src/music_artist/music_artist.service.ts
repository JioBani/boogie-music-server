import { Injectable } from '@nestjs/common';
import { CreateMusicArtistDto } from './dto/create-music_artist.dto';
import { UpdateMusicArtistDto } from './dto/update-music_artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { MusicArtist } from 'src/domain/music_artist.entity';

@Injectable()
export class MusicArtistService {
  constructor(
    @InjectRepository(MusicArtist)
    private musicArtistRepository : Repository<MusicArtist>
  ){}
  
  
  //#. getAll
  async getAll() {
    return await this.musicArtistRepository.find();
  }

  //#. findById
  async findById(musidId: number, artsitId : number) {
    var findOption : FindOptionsWhere<MusicArtist>;

    if(musidId && artsitId){
      findOption = {
        music_id : musidId,
        artist_id : artsitId,
      }
    }
    else if(musidId){
      findOption = {
        music_id : musidId,
      }  
    }
    else if(artsitId){
      findOption = {
        artist_id : artsitId,
      }   
    }
    else{
      return [];
    }

    return this.musicArtistRepository.find({
      where : findOption
    });    
  }

  //#. add
  async create(createMusicArtistDto: CreateMusicArtistDto) {
    return await this.musicArtistRepository.insert(createMusicArtistDto);  
  }

  //# delete
  async remove(musid_id: number, artist_id : number,) {
    return await this.musicArtistRepository.createQueryBuilder()
      .where(`music_id = :music_id `, {musid_id})
      .andWhere(`artist_id = :artist_id`,{artist_id})
      .delete()
      .execute();
  }
}
