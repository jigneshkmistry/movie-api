import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class AuthRegisterDto {
    @ApiProperty({
        type: String,
        description: 'UserName',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        type: String,
        description: 'User Password',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
