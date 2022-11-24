import { Module } from '@nestjs/common';
import { NannyApplicationService } from './application/services/nanny-application.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterParentValidator } from './application/validators/register-parent.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterNannyHandler } from './application/handlers/commands/register-nanny.handler';
import { ParentRegisteredHandler } from '../notifications/application/handlers/events/parent-registered.handler';
import { GetParentClientsHandler } from './application/handlers/queries/get-parent-clients.handler';
import { ParentApplicationService } from './application/services/parent-application.service';
import { RegisterNannyValidator } from './application/validators/register-nanny.validator';
import { RegisterParentHandler } from './application/handlers/commands/register-parent.handler';
import { NannyRegisteredHandler } from '../notifications/application/handlers/events/nanny-registered.handler';
import { ClientEntity } from './infrastructure/persistence/entities/client.entity';
import { ParentEntity } from './infrastructure/persistence/entities/parent.entity';
import { NannyEntity } from './infrastructure/persistence/entities/nanny.entity';
import { ParentController } from './interface/rest/parent.controller';
import { NannyController } from './interface/rest/nanny.controller';
import { ParentEntityRepository } from './infrastructure/persistence/repositories/parent.repository';
import { NannyEntityRepository } from './infrastructure/persistence/repositories/nanny.repository';
import { GetNannyClientsHandler } from './application/handlers/queries/get-nanny-clients.handler';
import { PARENT_REPOSITORY } from './domain/aggregates/client/parent.repository';
import { NANNY_REPOSITORY } from './domain/aggregates/client/nanny.repository';

export const CommandHandlers = [RegisterParentHandler, RegisterNannyHandler];
export const EventHandlers = [ParentRegisteredHandler, NannyRegisteredHandler];
export const QueryHandlers = [GetParentClientsHandler, GetNannyClientsHandler];

@Module({
  imports: [
  CqrsModule,
    TypeOrmModule.forFeature([ClientEntity, ParentEntity, NannyEntity]),
  ],
  exports: [TypeOrmModule],
  controllers: [ParentController, NannyController],
  providers: [
    { useClass: ParentEntityRepository, provide: PARENT_REPOSITORY },
    { useClass: NannyEntityRepository, provide: NANNY_REPOSITORY },
    ParentApplicationService,
    NannyApplicationService,
    RegisterParentValidator,
    RegisterNannyValidator,
    ParentEntityRepository,
    NannyEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class ClientsModule {}
