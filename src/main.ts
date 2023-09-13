import { readFileSync } from 'fs'
import { resolve } from 'path'

import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { config } from 'dotenv'

import { AppModule } from './app.module'

config({ path: './.env' })

const packageJson = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json')).toString())

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get(ConfigService)
    const logger: Logger = new Logger()
    const swaggerPath = 'docs'

    const port: number = config.get<number>('APP_PORT')
    const host: string = config.get<string>('APP_HOST')

    app.useGlobalPipes(new ValidationPipe())

    const apiDocument = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle(packageJson.name)
            .setDescription(packageJson.description)
            .setVersion(packageJson.version)
            .build(),
    )
    SwaggerModule.setup(swaggerPath, app, apiDocument, {
        explorer: true,
    })

    await app.listen(port, host)

    const appUrl = await app.getUrl()

    logger.log(`Server running on ${appUrl}`)
    logger.log(`Swagger: ${appUrl}/${swaggerPath}`)
}
bootstrap()
