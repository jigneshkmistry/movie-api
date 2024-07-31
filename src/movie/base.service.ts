import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from 'src/database/repositories/base.repository';
import sequelize from 'sequelize';

@Injectable()
export abstract class BaseService<M extends sequelize.Model> {

  constructor(private baseRepository: BaseRepository<M>) {
  }

  create(createMovieDto: any) {
    return this.baseRepository.create(createMovieDto)
  }

  findAndCountAll(pageNo: number = 1, pageSize: number = 10, fields: string = "",order: string = "") {
    return this.baseRepository.findAndCountAll(pageNo,pageSize,fields,order);
  }

  async findOne(id: number,fields = "") {
    let entity = await this.baseRepository.findOne(id,fields);
    if (entity) {
      return entity;
    }
    else {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }

  update(id: number, updateMovieDto: any) {

    return this.baseRepository.update(id, updateMovieDto);
  }

  remove(id: number) {
    return this.baseRepository.delete(id);
  }
}
