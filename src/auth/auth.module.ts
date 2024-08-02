import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CognitoService } from './cognito.service';

@Module({
  imports: [],
  providers: [AuthService, CognitoService],
  controllers: [AuthController],
})
export class AuthModule {}
