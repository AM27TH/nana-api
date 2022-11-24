import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterParentRequest } from '../dtos/request/register-parent-request.dto';
import { RegisterParentResponse } from '../dtos/response/register-parent-response.dto';
import { RegisterParentValidator } from '../validators/register-parent.validator';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterParent } from '../handlers/commands/register-parent.command';
import { ParentRepository, PARENT_REPOSITORY } from 'src/clients/domain/aggregates/client/parent.repository';
import { Parent } from 'src/clients/domain/aggregates/client/parent.entity';
import { ParentMapper } from '../mappers/parent.mapper';

@Injectable()
export class ParentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerParentValidator: RegisterParentValidator,
    @Inject(PARENT_REPOSITORY)
    private readonly parentRepository: ParentRepository,
  ) {}

  async register(
    registerParentRequest: RegisterParentRequest,
  ): Promise<Result<AppNotification, RegisterParentResponse>> {
    const registerParent: RegisterParent = ParentMapper.dtoRequestToCommand(registerParentRequest);
    const notification: AppNotification = await this.registerParentValidator.validate(registerParent);
    if (notification.hasErrors()) return Result.error(notification);
    const parent: Parent = await this.commandBus.execute(registerParent);
    const response: RegisterParentResponse = ParentMapper.domainToDtoResponse(parent);
    return Result.ok(response);
  }

  async getById(id: number) {
    return await this.parentRepository.getById(id);
  }
}