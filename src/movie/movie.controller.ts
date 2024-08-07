import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Authentication, CognitoUser } from '@nestjs-cognito/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { CognitoJwtPayload } from 'aws-jwt-verify/jwt-model';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
@Controller('movie')
@ApiTags('Movies')
@ApiBearerAuth('access-token') 
@Authentication()
export class MovieController {
  constructor(private readonly movieService: MovieService,
    private readonly fileUploadService: FileUploadService
  ) { }


  @Get()
  @ApiOperation({ summary: 'Get a paged movie data for a logged in user' })
  @ApiResponse({ status: 200, description: 'The movies retrieved successfully' })
  @ApiQuery({ name: 'fields', required: false, description: 'comma separated fields you want in response', example: 'id,title' })
  @ApiQuery({ name: 'pageNo', required: false, description: 'page no. Default value 1', example: '1' })
  @ApiQuery({ name: 'pagesize', required: false, description: 'page size. Default value 10', example: '10' })
  @ApiQuery({ name: 'order', required: false, description: 'sort order for the response. Default value id desc', example: 'id desc' })
  findAll(@Query('fields') fields: string, @Query('pageNo') pageNo: number = 1,
    @Query('pagesize') pageSize: number = 10,
    @Query('order') order: string = "",
    @CognitoUser() cognitoJwtPayload: CognitoJwtPayload) {
    return this.movieService.getPagedMovies(cognitoJwtPayload.sub, pageNo, pageSize, fields, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie details' })
  @ApiQuery({ name: 'fields', required: false, description: 'comma separated fields you want in response', example: 'id,title' })
  @ApiResponse({ status: 200, description: 'The movie details retrieved successfully' })
  @ApiResponse({ status: 404, description: 'The movie not found' })
  findOne(@Param('id', ParseIntPipe) id: number, @Query('fields') fields: string,
    @CognitoUser() cognitoJwtPayload: CognitoJwtPayload) {
    return this.movieService.getMoviesDetails(id, cognitoJwtPayload.sub, fields);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a movie' })
  @ApiResponse({ status: 201, description: 'The movie created successfully' })
  @ApiResponse({ status: 400, description: 'The movie with given titile already exists' })
  create(@Body(ValidationPipe) createMovieDto: CreateMovieDto,
    @CognitoUser() cognitoJwtPayload: CognitoJwtPayload) {
    createMovieDto.sub = cognitoJwtPayload.sub;
    return this.movieService.createMovies(createMovieDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'updates a movie details' })
  @ApiResponse({ status: 200, description: 'The movie details updated successfully' })
  @ApiResponse({ status: 404, description: 'The movie not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateMovieDto: UpdateMovieDto,
    @CognitoUser() cognitoJwtPayload: CognitoJwtPayload) {
    updateMovieDto.sub = cognitoJwtPayload.sub;
    return this.movieService.updateMovies(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'deletes a movie' })
  @ApiResponse({ status: 200, description: 'The movie deleted successfully' })
  @ApiResponse({ status: 404, description: 'The movie not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }

  @Post('upload')
  @ApiOperation({ summary: 'upload a movie poster image' })
  @ApiResponse({ status: 200, description: 'The movie postet uploaded successfully' })
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = "";
    let fileLocation = await this.fileUploadService.uploadFile(file);
    return { url: fileLocation };
  }

}
