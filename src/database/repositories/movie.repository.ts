import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from '../models/movie.model';
import { BaseRepository } from './base.repository';

@Injectable()
export class MovieRepository extends BaseRepository<Movie> {
    constructor() {
            super(Movie);
    }

    async create(createMovie: any): Promise<Movie> {
        return this.Model.create(createMovie);
    }

    async findAll(): Promise<{ rows: Movie[], count: number }> {
        return this.Model.findAndCountAll();
    }

    async findOne(id: number): Promise<Movie> {
        return this.Model.findOne({ where: { id } });
    }

    async update(id: number, updateData: Partial<Movie>): Promise<Movie> {
        let update_result = await this.Model.update(updateData, {
            where: { id },
            returning: true,
        });

        return update_result && update_result.length > 0 ? update_result[1][0] : null;
    }

    async delete(id: number): Promise<number> {
        return this.Model.destroy({ where: { id } });
    }
}
