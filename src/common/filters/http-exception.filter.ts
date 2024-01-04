import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException ,
} from '@nestjs/common'
import { Response } from 'express'

interface HttpExceptionBody {
    type: string,
    reason: string,
    errors?: object
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const exceptionBody = exception.getResponse() as Record<string, any>
        const body: HttpExceptionBody = {
            type: 'error',
            reason: exceptionBody.message || 'Internal server error',
        }
        if (exceptionBody.errors) {
            body.errors = exceptionBody.errors
        }

        response.status(exception.getStatus()).json(body)
    }
}
