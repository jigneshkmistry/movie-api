import { Injectable } from '@nestjs/common';
import { MovieRepository } from 'src/database/repositories/movie.repository';
import { BaseService } from './base.service';
import { Movie } from 'src/database/models/movie.model';

@Injectable()
export class MovieService extends BaseService<Movie> {

  constructor(private readonly movieRepository: MovieRepository) {
    super(movieRepository);
  }
}