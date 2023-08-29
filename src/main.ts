import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './modules/app.module'
import init from './init'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const PORT = configService.get<number>('port')

    init(app)

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

bootstrap().catch(e => console.log(`The server did not start. Error: ${e.message}`))
