import { Artist } from 'src/domain/artist.entity';
import { Music } from 'src/domain/music.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'music_artist' })
export class MusicArtist {
  @PrimaryColumn()
  music_id: number;

  @PrimaryColumn()
  artist_id: number;

  @ManyToOne(() => Music, music => music.music_id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'music_id' })
  music: Music;

  @ManyToOne(() => Artist, artist => artist.artist_id, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'artist_id' })
  artist: Artist;
}
