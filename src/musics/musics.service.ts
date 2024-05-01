import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Music } from 'src/domain/music.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicArtist } from 'src/domain/music_artist.entity';
import { Artist } from 'src/domain/artist.entity';
import { MusicDto } from './dto/music.dto';
import { Album } from 'src/domain/album.entity';

@Injectable()
export class MusicsService {
  constructor(
    @InjectRepository(Music)
    private musicRepository : Repository<Music>,

    @InjectRepository(MusicArtist)
    private musicArtistRepository : Repository<MusicArtist>,

    @InjectRepository(Album)
    private albumRepository : Repository<Album>,
  ){}

  //#. getAll
  async getAll() : Promise<Music[]> {
    return await this.musicRepository.find({
      relations : {
        album : true,
        artists : true
      }
    });
  }

  //#. getAllDto
  async getAllDto() : Promise<MusicDto[]> {
    var musics = await this.musicRepository.find({
      relations : {
        album : true,
        artists : true
      }
    });

    return musics.map((music)=>MusicDto.fromAttributes(music));
  }

  //#. findByMusicId  
  async findByMusicId(id: number) : Promise<Music>{
    const result = await this.musicRepository.findOne({where : {music_id : id}});
    if(!result){
      throw new NotFoundException(`Music with ID ${id} not found.`);
    }
    else{
      return result;
    }     
  }

  //#. findDtoByMusicId
  async findDtoByMusicId(id: number) : Promise<MusicDto>{
    const result = await this.musicRepository.findOne({
      where : {music_id : id},
      relations : {
        album : true,
        artists : true
      }
    });

    if(!result){
      throw new NotFoundException(`Music with ID ${id} not found.`);
    }
    else{
      return MusicDto.fromAttributes(result);
    }
  }

  
  //#. findByTitle
  async findByTitle(title: string) : Promise<Music[]>{
    return await this.musicRepository
      .createQueryBuilder("music")
      .where("music.music_title LIKE :title", { title: `%${title}%` })
      .getMany();
  }

  //#. findDtoByTitle
  async findDtoByTitle(title: string) : Promise<MusicDto[]> {
    var musics : Music[] = await this.musicRepository.createQueryBuilder("music")
        .leftJoinAndSelect("music.album", "album")
        .leftJoinAndSelect("music.artists", "artists")
        .where("music.music_title LIKE :title", { title: `%${title}%` })
        .getMany();

    return musics.map(music => MusicDto.fromAttributes(music));
  }

  findByAlbumId(id : number) : Promise<Music[]>{
    return this.musicRepository.find({where : {album_id : id}});
  }


  async findDtoByAlbumId(id : number) : Promise<MusicDto[]>{
    const musics = await this.musicRepository.find({
      where : {album_id : id},
      relations : {
        album : true,
        artists : true
      }
    });

    return musics.map((music)=>MusicDto.fromAttributes(music));
  }
  
  async findDtoByArtistId(artistId : number){
    const musics = await this.musicRepository.createQueryBuilder("music")
        .leftJoinAndSelect("music.album", "album")
        .leftJoinAndSelect("music.artists", "artists") 
        .innerJoin(
          "music_artist", "musicArtist", 
          "musicArtist.music_id = music.music_id and musicArtist.artist_id = :artistId", { artistId : artistId })
        .getMany();

    return musics.map(music => MusicDto.fromAttributes(music));
  }

  //#. create
  create(createMusicDto: CreateMusicDto) {    
    return this.musicRepository.insert(createMusicDto);
  }

  //#. update  
  update(id: number, updateMusicDto: UpdateMusicDto) {
    const result = this.musicRepository.createQueryBuilder()
      .update(Music)
      .set(updateMusicDto)
      .where('id = :id', { id })
      .execute();
  }

  //#. remove  
  async remove(id: number) {
    return await this.musicRepository.createQueryBuilder()
      .delete()
      .from(Music)
      .where('id = :id', { id })
      .execute();
  } 

  //#. 스프리밍 카운트 증가
  async incrementStreamingCount(music_id: number){
     return this.musicRepository.increment({ music_id }, 'streaming_count', 1);
  }
}
