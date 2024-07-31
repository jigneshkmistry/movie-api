import { Injectable } from '@nestjs/common';
import { Model } from "sequelize";
import sequelize from "sequelize";

@Injectable()
export class BaseRepository<M extends Model> {

    protected Model!: sequelize.ModelStatic<M>;

    constructor(model: sequelize.ModelStatic<M>) {

        this.Model = model;
    }

    async createMovie(createMovie: any): Promise<M> {
        return this.Model.create(createMovie);
    }

    async findAll(): Promise<{ rows: M[], count: number }> {
        return this.Model.findAndCountAll();
    }

    // async findOne(id: number): Promise<M> {
    //     // return this.getModel().findOne({ where: { id } })
    //     //return this.Model.findOne({ where: { id } });
    // }

    public getModel(){
        return Model;
    }

    // async update(id: number, updateData: Partial<M>): Promise<M> {

    //     // @ts-ignore
    //     let update_result = await this.Model.update(updateData, {
    //         where: { id: id }
    //     });

    //     return update_result && update_result.length > 0 ? update_result[1][0] : null;
    // }

    // async delete(id: number): Promise<number> {
    //     return this.Model.destroy({ where : [id]});
    // }

}