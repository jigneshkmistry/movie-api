import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Movie extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  title: string;

  @Column
  publishing_year: number;

  @Column
  poster: string;
}