import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { NannyApplicationService } from 'src/clients/application/services/nanny-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { RegisterNannyRequest } from 'src/clients/application/dtos/request/register-nanny-request.dto';
import { RegisterNannyResponse } from 'src/clients/application/dtos/response/register-nanny-response.dto';
import { GetNannyClients } from 'src/clients/application/messages/queries/get-nanny-clients.query';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('clients/nanny')
@ApiTags('nanny clients')
export class NannyController {
  constructor(
    private readonly nannyApplicationService: NannyApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Register Nanny in Nana' })
  async register(
    @Body() registerNannyRequest: RegisterNannyRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterNannyResponse> = await this.nannyApplicationService.register(registerNannyRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  @ApiOperation({ summary: 'Get all Nanny of Nana' })
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetNannyClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get nanny Id' })
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const parent = await this.nannyApplicationService.getById(id);
      return ApiController.ok(response, parent);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
