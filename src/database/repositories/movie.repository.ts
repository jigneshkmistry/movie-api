import { Injectable } from '@nestjs/common';
import { Movie } from '../models/movie.model';
import { BaseRepository } from './base.repository';

@Injectable()
export class MovieRepository extends BaseRepository<Movie> {
    constructor() {
        super(Movie);
    }

    getDefautlSortOptions(): [string, 'ASC' | 'DESC'][] {
        return [['id', 'DESC']]
    }
}
