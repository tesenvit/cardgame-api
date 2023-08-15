import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { AppValidationPipe } from './utils/pipes/app-validation.pipe'

async function bootstrap() {
    const PORT = process.env.PORT
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new AppValidationPipe())

    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

bootstrap()
