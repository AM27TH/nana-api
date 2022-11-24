import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AppNotification } from 'src/shared/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterNannyValidator } from '../validators/register-nanny.validator';
import { RegisterNanny } from '../handlers/commands/register-nanny.command';
import { RegisterNannyRequest } from '../dtos/request/register-nanny-request.dto';
import { RegisterNannyResponse } from '../dtos/response/register-nanny-response.dto';
import { NannyRepository, NANNY_REPOSITORY } from 'src/clients/domain/aggregates/client/nanny.repository';
import { NannyMapper } from '../mappers/nanny.mapper';
import { Nanny } from 'src/clients/domain/aggregates/client/nanny.entity';

@Injectable()
export class NannyApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerNannyValidator: RegisterNannyValidator,
    @Inject(NANNY_REPOSITORY)
    private readonly nannyRepository: NannyRepository,
  ) {}

  async getById(id: number) {
    return await this.nannyRepository.getById(id);
  }

  async register(registerNannyRequest: RegisterNannyRequest): Promise<Result<AppNotification, RegisterNannyResponse>> {
    const registerNanny: RegisterNanny = NannyMapper.dtoRequestToCommand(registerNannyRequest);
    const notification: AppNotification = await this.registerNannyValidator.validate(registerNanny);
    if (notification.hasErrors()) return Result.error(notification);
    const nanny: Nanny = await this.commandBus.execute(registerNanny);
    const response: RegisterNannyResponse = NannyMapper.domainToDtoResponse(nanny);
    return Result.ok(response);
  }
}