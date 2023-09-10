import { UserModel } from '../users/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    imports: [ConfigModule],
    inject: [ConfigService],
    provide: 'SEQUELIZE',
    useFactory: async (config: ConfigService) => {
      const sequelize = new Sequelize({
        database: config.get<string>('PSQL_DATABASE'),
        dialect: 'postgres',
        username: config.get<string>('PSQL_USERNAME'),
        password: config.get<string>('PSQL_PASSWORD'),
        host: config.get<string>('PSQL_HOST'),
        port: config.get<number>('PSQL_PORT'),
      });
      sequelize.addModels([UserModel]);
      return sequelize;
    },
  },
];
