import { NowPlayDto } from "src/domain/now-play.extend.entity";

export class NowPlayListDto{
    user_id : string;
    nowPlayDtoList : NowPlayDto[];
    
    constructor(userId : string, nowPlayDtoList : NowPlayDto[]){
        this.user_id = userId;
        this.nowPlayDtoList = nowPlayDtoList;
    }  

    pushDto(nowPlayDto : NowPlayDto){
        this.nowPlayDtoList.push(nowPlayDto);
    }
}