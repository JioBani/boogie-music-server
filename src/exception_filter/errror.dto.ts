export class ErrorDto{
    constructor(
        public message : string,
        public error : string,
        public statusCode : number,
    ){}
}