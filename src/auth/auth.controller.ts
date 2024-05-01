import { Body, Controller, Get, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ValidateUserDto } from './dto/validate-user.dto';
import { JwtAuthGuard } from './security/auth.guard';
import { RolesGuard } from './security/roles.guard';
import { Roles } from './decorator/role.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshJwtGuard } from './security/refresh.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  save(@Body() createUserDto : CreateUserDto){
    return this.authService.registerUser(createUserDto)
  }
  
  @Get('/authenticate')
  @UseGuards(JwtAuthGuard)
  isAuthenticated(@Req() req: Request): any { 
      const user: any = req.user;
      return user;
  }

  @Get('/admin')
  @UseGuards(JwtAuthGuard , RolesGuard)
  @Roles('admin')
  isAdmin(@Req() req: Request): any { 
      const user: any = req.user;
      return user;
  }

  @Get('/user')
  @UseGuards(AuthGuard("jwt") , RolesGuard)
  @Roles('user' , "admin")
  isUser(@Req() req: Request): any { 
      const user: any = req.user;
      return user;
  }

  @Post('/login')
  async login(@Body() userDTO: ValidateUserDto, @Res() res: Response): Promise<any> {
      const jwt = await this.authService.validateUser(userDTO);
      res.setHeader('Authorization', 'Bearer ' + jwt.accessToken);
      return res.json(jwt);
  } 

  @Get()
  get(){
    return this.authService.get()
  }


 
  @Post('/refresh')
  @UseGuards(RefreshJwtGuard)
  refresh(@Req() req: Request): any { 
      console.log("isAuthenticated");
      const user: any = req.user;
      return user;
  }




  // //#. create
  // @Post()
  // @UseGuards(AuthGuard , RolesGuard)
  // @Roles('user' , "admin")
  // create(@Req() req: Request, @Body() createPlaylistDto: CreatePlaylistDto) {
  //   const user : User = req.user as User;
  //   return this.playlistsService.create(createPlaylistDto , user.user_id);
  // }
}
