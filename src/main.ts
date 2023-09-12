import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'

import { AppModule } from './app.module'

config({ path: './.env' })

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get(ConfigService)
    const logger: Logger = new Logger()

    const port: number = config.get<number>('APP_PORT')
    const host: string = config.get<string>('APP_HOST')

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(port, host)

    const appUrl = await app.getUrl()
    logger.log(`Server running on ${appUrl}`)
}
bootstrap()
