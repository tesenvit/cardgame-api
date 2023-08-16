import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './modules/app.module'
import { AppValidationPipe } from './utils/pipes/app-validation.pipe'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)
    const PORT = configService.get<number>('port')

    app.useGlobalPipes(new AppValidationPipe())

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

bootstrap()
