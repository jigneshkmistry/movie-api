import { Injectable } from '@nestjs/common';
import { CognitoIdentityProviderClient, InitiateAuthCommand, AdminUpdateUserAttributesCommand, AdminConfirmSignUpCommand, SignUpCommand, InitiateAuthCommandInput } from '@aws-sdk/client-cognito-identity-provider';

@Injectable()
export class CognitoService {
  private client: CognitoIdentityProviderClient;

  constructor() {
    this.client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
  }

  async registerUser(username: string, password: string, email: string) {
    const params = {
      ClientId: process.env.COGNITO_CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ]
    };

    const command = new SignUpCommand(params);
    await this.client.send(command);

    // Confirm the user
    const confirmCommand = new AdminConfirmSignUpCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
    });
    await this.client.send(confirmCommand);

    // Mark the email as verified
    const updateAttributesCommand = new AdminUpdateUserAttributesCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: username,
      UserAttributes: [
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    });
    return this.client.send(updateAttributesCommand);
  }

  async authenticateUser(username: string, password: string) {
    const params : InitiateAuthCommandInput = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      },
    };

    const command = new InitiateAuthCommand(params);
    const response = await this.client.send(command);
    return response.AuthenticationResult;
  }


}
