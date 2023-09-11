import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'

config({ path: './.env' })

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const config = app.get(ConfigService)

    const port: number = config.get<number>('APP_PORT')
    const host: string = config.get<string>('APP_HOST')

    await app.listen(port, host)

    const appUrl = await app.getUrl()
    console.log(`Server running on ${appUrl}`)
}
bootstrap()
