import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MovieModule, DatabaseModule]
})
export class AppModule {}
