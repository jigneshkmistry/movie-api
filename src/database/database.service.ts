import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DatabaseService implements OnModuleInit {
    constructor(@InjectConnection() private readonly sequelize: Sequelize) { }

    async onModuleInit() {
        await this.syncDatabase();
    }

    private async syncDatabase() {
        try {
            await this.sequelize.sync({ alter: true }); // Use alter to make changes to the existing tables
            console.log('Database synchronized successfully');
        } catch (error) {
            console.error('Failed to synchronize database:', error);
        }
    }
}
