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
            host: process.env.host || 'movie.cr2gkqqce18e.us-east-1.rds.amazonaws.com',
            port: +process.env.port || 5432,
            username: process.env.username || 'postgres',
            password: process.env.password || 'Football2024',
            database: process.env.database || 'movie',
            autoLoadModels: true,
            synchronize: true, // Do not use this in production, use migrations instead
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
