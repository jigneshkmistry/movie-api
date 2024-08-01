import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class Movie extends Model {
  @Column({
  primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Unique 
  @Column
  title: string;

  @Column
  publishing_year: number;

  @Column
  poster: string;
}