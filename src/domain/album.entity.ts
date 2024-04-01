import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  album_id: number;

  @Column({ length: 256 })
  album_title: string;

  @Column({ length: 256, nullable: true })
  album_image_url: string;
}
