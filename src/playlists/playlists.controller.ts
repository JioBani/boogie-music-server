import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, NotFoundException} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/security/auth.guard';
import { User } from 'src/domain/user.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}


  //#. get all
  @Get('/all')
  //@UseGuards(AuthGuard , RolesGuard)
  //@Roles("admin")
  getAll() {
    return this.playlistsService.getAll();
  }

  //#. get playlist by user
  @Get('/user')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('user' , "admin")
  getPlaylistByUser(@Req() req: Request) {
    const user : User = req.user as User;
    return this.playlistsService.findByUserId(user.user_id);
  } 


  //#. get by playlist id
  @Get('extend/:id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('user' , "admin")
  getPlaylistExtend(@Req() req: Request, @Param('id') id: string) {
    const user : User = req.user as User;
    return this.playlistsService.findDtoByPlaylistId(+id , user.user_id,true);
  }

  //#. get by playlist id
  @Get('extend')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('user' , "admin")
  getPlaylistExtendByUserId(@Req() req: Request) {
    const user : User = req.user as User;
    return this.playlistsService.findExtendByUserId(user.user_id);
  }

  //#. create
  @Post()
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('user' , "admin")
  create(@Req() req: Request, @Body() createPlaylistDto: CreatePlaylistDto) {
    const user : User = req.user as User;
    return this.playlistsService.create(createPlaylistDto , user.user_id);
  }

  //#. update 
  @Patch(':id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('user' , "admin")
  update(@Req() req: Request, @Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    const user : User = req.user as User;
    return this.playlistsService.updateByPlaylistId(+id, updatePlaylistDto,user.user_id,true);
  } 

  //#. delete
  @Delete(':id')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('user' , "admin")
  remove(@Req() req: Request, @Param('id') id: string) {
    const user : User = req.user as User
    return this.playlistsService.remove(+id , user.user_id,true);
  }  
}
