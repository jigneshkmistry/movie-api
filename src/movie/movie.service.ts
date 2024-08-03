import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async getPagedMovies(sub: string, pageNo: number = 1, pageSize: number = 10, fields: string = "", order: string = "") {
    return this.findAndCountAll({ sub }, pageNo, pageSize, fields, order);
  }

  async getMoviesDetails(id: number, sub: string, fields = "") {
    let movie = await this.getByWhereClause({ id, sub }, fields);
    if (movie && movie.length > 0) {
      return movie[0];
    }
    else {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
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
      [Op.and]: [{
        title: {
          [Op.iLike]: updateMovieDto.title
        }
      }, {
        id: {
          [Op.ne]: id
        }
      }]
    }, "id,title");

    if (movies && movies.length > 0) {
      throw new BadRequestException(`Movie with title ${updateMovieDto.title} already exists`);
    }

    let movie = await this.findOne(id, "id");

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return this.movieRepository.update(id, updateMovieDto);
  }

}