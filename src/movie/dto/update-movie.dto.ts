import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class UpdateMovieDto {
    @ApiProperty({
        type: String,
        description: 'Title for a movie',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        type: Number,
        description: 'Publishing year of a movie',
    })
    @IsNumber()
    publishing_year: number;

    @ApiProperty({
        type: String,
        description: 'Poster image url for a movie',
    })
    @IsUrl()
    poster: string;

    sub: string;
 }
