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

  findAndCountAll(where: any = {}, pageNo: number = 1, pageSize: number = 10, fields: string = "", order: string = "") {
    return this.baseRepository.findAndCountAll(where, pageNo, pageSize, fields, order);
  }

  async findOne(id: number, fields = "") {
    let entity = await this.baseRepository.findOne(id, fields);
    if (entity) {
      return entity;
    }
    else {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }

  async getByWhereClause(whereClause: any, fields: string = "", sortOrder: string = "") {

    return this.baseRepository.getByWhereClause(whereClause, fields, sortOrder);
  }

  async update(id: number, updateMovieDto: any) {

    let entity = await this.findOne(id, "id");
    if (entity) {
      return this.baseRepository.update(id, updateMovieDto);
    }
    else {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }

  async remove(id: number) {
    let entity = await this.findOne(id, "id");
    if (entity) {
      return this.baseRepository.delete(id);
    }
    else {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
