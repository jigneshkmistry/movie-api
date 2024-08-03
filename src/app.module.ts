import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, MovieModule, DatabaseModule, CognitoAuthModule.register({
    jwtVerifier: {
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      clientId: process.env.COGNITO_CLIENT_ID,
      tokenUse: "access",
    },
  })],
  providers: []
})
export class AppModule {}
