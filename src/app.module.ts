import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './orm.config';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { Album } from './domain/album.entity';
import { Artist } from './domain/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({useFactory : ormConfig}),
    TypeOrmModule.forFeature([Artist,Album]),
    ArtistsModule,
    AlbumsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
