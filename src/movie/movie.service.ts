import { BadRequestException, Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/database/repositories/movie.repository';
import { BaseService } from './base.service';
import { Movie } from 'src/database/models/movie.model';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Op } from 'sequelize';

@Injectable()
export class MovieService extends BaseService<Movie> {

  constructor(private readonly movieRepository: MovieRepository) {
    super(movieRepository);
  }

  async createMovies(createMovieDto: CreateMovieDto) {
    let movies = await this.movieRepository.getByWhereClause({
      title: {
        [Op.iLike]: createMovieDto.title
      }
    }, "id,title");
    if (movies && movies.length > 0) {
      throw new BadRequestException(`Movie with title ${createMovieDto.title} already exists`);
    }
    else {
      return this.create(createMovieDto);
    }
  }

  async updateMovies(id: number, updateMovieDto: UpdateMovieDto) {
    let movies = await this.movieRepository.getByWhereClause({
      title: {
        [Op.iLike]: updateMovieDto.title
      }
    }, "id,title");
    if (movies && movies.length > 0) {
      throw new BadRequestException(`Movie with title ${updateMovieDto.title} already exists`);
    }
    else {
      return this.movieRepository.update(id, updateMovieDto);
    }
  }


}