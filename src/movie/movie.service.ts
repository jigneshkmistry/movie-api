import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieRepository } from 'src/database/repositories/movie.repository';

@Injectable()
export class MovieService {

  constructor(private readonly movieRepository: MovieRepository) {
  }

  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.create(createMovieDto)
  }

  findAll() {
    return this.movieRepository.findAll();
  }

  findOne(id: number) {
    return this.movieRepository.findOne(id);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id, updateMovieDto);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }
}
