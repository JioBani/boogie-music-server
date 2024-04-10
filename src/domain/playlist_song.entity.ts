import { Music } from 'src/domain/music.entity';
import { Playlist } from 'src/domain/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class PlaylistSong {
  @PrimaryColumn()
  playlist_id: number;

  @Column()
  playlist_order: number;

  @PrimaryColumn()
  music_id: number;

  @ManyToOne(() => Playlist)
  @JoinColumn({ name: 'playlist_id' })
  playlist: Playlist;

  @ManyToOne(() => Music)
  @JoinColumn({ name: 'music_id' })
  music: Music;
}