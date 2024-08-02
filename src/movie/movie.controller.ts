import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, Query, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Authentication } from '@nestjs-cognito/auth';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';

@Controller('movie')
@Authentication()
export class MovieController {
  constructor(private readonly movieService: MovieService,
    private readonly fileUploadService: FileUploadService
  ) { }

  @Post()
  create(@Body(ValidationPipe) createMovieDto: CreateMovieDto) {
    return this.movieService.createMovies(createMovieDto);
  }

  @Get()
  findAll(@Query('fields') fields: string, @Query('pageno') pageNo: number = 1,
    @Query('pagesize') pageSize: number = 10,
    @Query('order') order: string = "") {
    return this.movieService.findAndCountAll(pageNo, pageSize, fields, order);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Query('fields') fields: string) {
    return this.movieService.findOne(id,fields);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovies(id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = "";
    let fileLocation = await this.fileUploadService.uploadFile(file);
    return { url: fileLocation };
  }

}
