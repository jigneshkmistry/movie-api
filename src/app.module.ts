import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [MovieModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
