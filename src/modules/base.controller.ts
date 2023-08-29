import { HttpStatus } from '@nestjs/common'
import { Response } from 'express'

export abstract class BaseController {

    protected result(
        response: Response,
        data: string|object|object[]
    ): Response {
        return response.status(HttpStatus.OK).json({
            type: 'result',
            result: data,
        })
    }

    protected success(response: Response): Response {
        return this.result(response, 'success')
    }
}
