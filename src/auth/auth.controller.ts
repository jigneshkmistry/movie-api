import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate a user and returns the auth tokens' })
  @ApiResponse({ status: 401, description: 'Authnetication credentials are wrong' })
  async login(@Body() body: AuthLoginDto) {
    const { username, password } = body;
    return this.authService.login(username, password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registers a new user in AWS cognito' })
  @ApiResponse({ status: 201, description: 'USer registered successfully' })
  async register(@Body() body: AuthRegisterDto) {
    const { username, password } = body;
    return this.authService.register(username, password, username);
  }

}
