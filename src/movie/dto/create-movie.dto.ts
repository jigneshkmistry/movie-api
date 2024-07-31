import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";
export class CreateMovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    publishing_year: number;

    @IsUrl()
    poster: string;
}
