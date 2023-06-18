import {IsNotEmpty, IsString} from "class-validator";

export  class CreateSheduleDto{
    @IsString()
    @IsNotEmpty()
    public subjectName:string;

    @IsString()
    @IsNotEmpty()
    public time:string;

    @IsString()
    @IsNotEmpty()
    public nameDate:string;

    @IsString()
    @IsNotEmpty()
    public className:string;
}