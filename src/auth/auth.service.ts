import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user.entity';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interface';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidateUserDto } from './dto/validate-user.dto';
import { RegistrationValidationException } from './exception/registration-validation.exception';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        
        @InjectRepository(User)
        private userRepository : Repository<User>,
    ){


    }
    get(){
        return this.userRepository.find();
    }

    async registerUser(newUser: CreateUserDto){

        this.validateCreateUserDto(newUser);

        let userFind: User = await this.userRepository.findOne({
            where : {user_id : newUser.user_id},
        });

        if(userFind) {
            throw new RegistrationValidationException('아이디가 이미 사용중입니다.');
        }

        newUser.user_pw = await this.transformPassword(newUser.user_pw);

        return this.userRepository.insert(newUser);
    }

    validateCreateUserDto(user : CreateUserDto) {
        if (user.user_id.length < 8) {
          throw new RegistrationValidationException('아이디는 8자리 이상이어야 합니다.');
        }
    
        if (!this.isValidUserId(user.user_id)) {
          throw new RegistrationValidationException('아이디에는 대소문자 영문과 숫자만 사용할 수 있습니다.');
        }
    
        if (user.user_name.length < 2) {
          throw new RegistrationValidationException('이름은 2자리 이상이어야 합니다.');
        }
    
        if (!this.isValidName(user.user_name)) {
          throw new RegistrationValidationException('이름에는 대소문자 영문, 한글과 -만 사용할 수 있습니다.');
        }
    
        if (user.user_pw.length < 8) {
          throw new RegistrationValidationException('비밀번호는 8자리 이상이어야 합니다.');
        }
    
        if (!this.isValidPassword(user.user_pw)) {
          throw new RegistrationValidationException('비밀번호는 대소문자 영문, 숫자, 특수문자 !@#$%~_-만 사용할 수 있습니다.');
        }
    } 
    
    private isValidUserId(username: string): boolean {
        //#. a~z , A~Z , 0~9
        return /^[a-zA-Z0-9]+$/.test(username);
    }

    private isValidPassword(password: string): boolean {
        //#.;  a~z , A~Z , 0~9 , !@#$%~_-
        return /^[a-zA-Z0-9!@#$%~_\-]+$/.test(password);
    }

    private isValidName(name: string): boolean {
        //#. a~z , A~Z , 한글
        return /^[a-zA-Z\uAC00-\uD7A3\s\-]+$/.test(name);
    }


    async transformPassword(password: string): Promise<string> {
        return await bcrypt.hash(
            password, 10,
        );
    }

    //#. 로그인
    async validateUser(userDto: ValidateUserDto): Promise<{accessToken: string , refreshToken : string} | undefined> {

        //#. 유저가 있는지 확인
        let userFind: User = await this.userRepository.findOne({
            where : {
                user_id : userDto.id
            }
        });

        if(!userFind){
            throw new UnauthorizedException();
        }
        

        //#. 비밀번호 대조
        const validatePassword = await bcrypt.compare(userDto.password, userFind.user_pw);

        if(!validatePassword) {
            throw new UnauthorizedException();
        }

        //#. 토큰 발행
        const accessToken = await this.generateAcesssToken(userFind);
        const refreshToken = await this.generateRefreshToken(userFind);

        //#. DB에 리프레시 토큰 기록
        await this.userRepository.update(userDto.id , {refresh_token : refreshToken})

        return {
            accessToken : accessToken,
            refreshToken : refreshToken
        };
    }

    //#. 유저가 있는지 확인
    async isUserExist(payload: Payload): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where : {
                user_id : payload.id
            }
        });
    }

   
    //#. 리프레스 토큰 확인
    async vaildateRefreshToken(refreshToken : string , payload : Payload) : Promise<User>{
        var user : User = await this.userRepository.findOne({
            where : {user_id : payload.id},
            select : ['user_id',"user_name","role",'refresh_token']
        })
        
        if(user.user_id == payload.id && refreshToken == user.refresh_token){
            return user;
        }
        else{
            return undefined;
        }
    }

    //#. 액세스 토큰 생성
    async generateAcesssToken(user : User){
        const payload: Payload = { 
            id : user.user_id,
            name : user.user_name,
            role : user.role,
        };

        return this.jwtService.sign(
            payload,     
            {
                secret : "JWT_SECRET", //TODO : 시크릿키 변경 및 환경변수화
                expiresIn : "30s"
            }               
        );
    }

    //#. 리프레시 토큰 생성
    async generateRefreshToken(user : User){
        const payload: Payload = { 
            id : user.user_id,
            name : user.user_name,
            role : user.role,
        };

        return this.jwtService.sign(
            payload,     
            {
                secret : "JWT_SECRET", //TODO : 시크릿키 변경 및 환경변수화
                expiresIn : "24h"
            }           
        );
    }

    //#. 리프레쉬 토큰으로 액세스 토큰 생성
    async generateAcesssTokenWithRefreshToken(refreshToken : string , user : User){

        const accessToken = await this.generateAcesssToken(user);
        const newRefreshToken = await this.generateRefreshToken(user);

        await this.userRepository.update(user.user_id , {refresh_token : refreshToken})

        return {
            accessToken : accessToken,
            refreshToken : newRefreshToken
        };
    }
}
