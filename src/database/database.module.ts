import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Movie } from './models/movie.model';
import { MovieRepository } from './repositories/movie.repository';
import { Certificate } from './certificate'
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.APP_DB_HOST,
            port: +process.env.APP_DB_PORT,
            username: process.env.APP_DB_USERNAME,
            password: process.env.APP_DB_PASSWORD,
            database: process.env.APP_DB_DATABASE,
            autoLoadModels: true,
            // synchronize: true, // Do not use this in production, use migrations instead
            ssl: true,
            dialectOptions: {
                ssl: {
                    ca: Certificate.content
                },
            }
        }),
        SequelizeModule.forFeature([Movie]),
    ],
    providers: [MovieRepository, DatabaseService],
    exports: [MovieRepository]
})
export class DatabaseModule { }
