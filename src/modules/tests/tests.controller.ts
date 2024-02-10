import { Controller, Get } from '@nestjs/common'
import { TestsService } from './tests.service'

@Controller('tests')
export class TestsController {
    constructor(private readonly testsService: TestsService) {}

    @Get()
    async findAll() {
        return await this.testsService.getAll()
    }
}
