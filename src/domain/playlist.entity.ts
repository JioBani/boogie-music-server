import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PlaylistSong } from "./playlist_song.entity";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  playlist_id: number;

  @Column({ length: 256 })
  user_id: string;

  @Column({ length: 256 })
  playlist_name: string;

  @OneToMany(() => PlaylistSong, playlistSong => playlistSong.playlist)
  songs: PlaylistSong[];
}

