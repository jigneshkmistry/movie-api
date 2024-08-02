import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FileUploadService } from './file-upload.service';

@Module({
  controllers: [MovieController],
  imports: [DatabaseModule],
  providers: [MovieService,FileUploadService],
})
export class MovieModule { }
