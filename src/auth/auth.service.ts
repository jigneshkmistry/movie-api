import { Injectable } from '@nestjs/common';
import { CognitoService } from './cognito.service';

@Injectable()
export class AuthService {
    constructor(private readonly cognitoService: CognitoService) { }

    async login(username: string, password: string) {
        return this.cognitoService.authenticateUser(username, password);
    }

    async register(username: string, password: string, email: string) {
        return this.cognitoService.registerUser(username, password, email);
    }

}
