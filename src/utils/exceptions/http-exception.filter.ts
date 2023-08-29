import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException ,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const exceptionBody = exception.getResponse() as Record<string, any>

        response
            .status(exception.getStatus())
            .json({
                type: 'error',
                reason: exceptionBody.message || 'Internal server error',
                errors: exceptionBody.errors || null,
            })
    }
}
