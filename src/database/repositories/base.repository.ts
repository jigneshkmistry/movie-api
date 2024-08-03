import { Injectable } from '@nestjs/common';
import { DestroyOptions, FindOptions, Model, WhereOptions } from "sequelize";
import sequelize from "sequelize";

@Injectable()
export class BaseRepository<M extends Model> {

    protected Model!: sequelize.ModelStatic<M>;

    constructor(model: sequelize.ModelStatic<M>) {
        this.Model = model;
    }

    async create(createMovie: any): Promise<M> {
        try {
            let res = await this.Model.create(createMovie);
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async findAndCountAll(where: any = {}, pageNo: number = 1, pageSize: number = 10, fields: string = "", sortOrder: string = ""): Promise<{ rows: M[], count: number }> {

        const offset = pageNo === 1 ? 0 : (pageNo - 1) * pageSize;
        const field_list = fields.split(',');
        const sort_order: [string, 'ASC' | 'DESC'][] = sortOrder
            ? this.convertToSortOrder(sortOrder) : this.getDefautlSortOptions();
        const where_cond: WhereOptions<M> = where ? where as any : {};
        const options: FindOptions<M> = {
            where : where_cond,
            attributes: field_list as any,
            offset : +offset,
            limit : +pageSize,
            order : sort_order
        };

        if (fields === "") {
            delete options.attributes;
        }

        return this.Model.findAndCountAll(options);
    }

    async findOne(id: number, fields: string = ""): Promise<M> {

        const field_list = fields.split(',');
        const where: WhereOptions<M> = { id } as any;
        const options: FindOptions<M> = {
            where,
            attributes: field_list as any
        };

        if (fields === "") {
            delete options.attributes;
        }

        return this.Model.findOne(options);
    }

    async getByWhereClause(whereClause: any, fields: string = "", sortOrder: string = ""): Promise<M[]> {

        const field_list = fields.split(',');
        const sort_order: [string, 'ASC' | 'DESC'][] = sortOrder
            ? this.convertToSortOrder(sortOrder) : this.getDefautlSortOptions();
        const where: WhereOptions<M> = whereClause as any;
        const options: FindOptions<M> = {
            where,
            attributes: field_list as any,
            order: sort_order
        };

        if (fields === "") {
            delete options.attributes;
        }

        return this.Model.findAll(options);
    }

    async update(id: number, updateData: Partial<M>): Promise<M> {

        const where: WhereOptions<M> = { id } as any;
        const [affectedCount, affectedRows] = await this.Model.update(updateData, {
            where,
            returning: true
        });
        return affectedCount > 0 ? affectedRows[0] : null;
    }

    async delete(id: number): Promise<number> {
        const where: WhereOptions<M> = { id } as any;
        return this.Model.destroy({ where });
    }

    getDefautlSortOptions(): [string, 'ASC' | 'DESC'][] {
        return [['id', 'DESC']]
    }

    convertToSortOrder(sortString: string): [string, 'ASC' | 'DESC'][] {
        return sortString.split(',').map(part => {
            const [field, order] = part.trim().split(' ');
            if (order && order.toUpperCase() === 'DESC') {
                return [field, 'DESC'];
            }
            return [field, 'ASC'];
        }) as [string, 'ASC' | 'DESC'][];
    }

}