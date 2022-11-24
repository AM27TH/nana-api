import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { Result } from 'typescript-result';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterParentRequest } from 'src/clients/application/dtos/request/register-parent-request.dto';
import { ParentApplicationService } from 'src/clients/application/services/parent-application.service';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterParentResponse } from 'src/clients/application/dtos/response/register-parent-response.dto';
import { ApiController } from 'src/shared/interface/rest/api.controller';
import { GetParentClients } from 'src/clients/application/messages/queries/get-parent-clients.query';

@Controller('clients/parent')
export class ParentController {
  constructor(
    private readonly parentApplicationService: ParentApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('')
  async register(
    @Body() registerParentRequest: RegisterParentRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterParentResponse> = await this.parentApplicationService.register(registerParentRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('')
  async getAll(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetParentClients());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const parent = await this.parentApplicationService.getById(id);
      return ApiController.ok(response, parent);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}