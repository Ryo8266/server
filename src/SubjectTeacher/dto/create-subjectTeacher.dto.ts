import {IsNotEmpty, IsString} from "class-validator";

export  class CreateSubjectTeacherDto{
    @IsString()
    @IsNotEmpty()

    public name:string;
}

