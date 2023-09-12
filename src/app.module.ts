import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'

@Module({
    imports: [ConfigModule, DatabaseModule, UsersModule],
})
export class AppModule {}
