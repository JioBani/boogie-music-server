import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  playlist_id: number;

  @Column({ length: 256 })
  user_id: string;

  @Column({ length: 256 })
  playlist_name: string;
}

