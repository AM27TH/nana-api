import { Nanny } from 'src/clients/domain/aggregates/client/nanny.entity';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { NannyFactory } from 'src/clients/domain/factories/nanny.factory';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { NannyName } from 'src/shared/domain/values/nanny-name.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { NannyClientDto } from '../dtos/response/nanny-client.dto';
import { RegisterNanny } from '../handlers/commands/register-nanny.command';
import { RegisterNannyRequest } from '../dtos/request/register-nanny-request.dto';
import { RegisterNannyResponse } from '../dtos/response/register-nanny-response.dto';
import { NannyEntity } from 'src/clients/infrastructure/persistence/entities/nanny.entity';
import { NannyNameValue } from 'src/clients/infrastructure/persistence/values/nanny-name.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';

export class NannyMapper {
  public static dtoRequestToCommand(registerNannyRequest: RegisterNannyRequest): RegisterNanny {
    return new RegisterNanny(
        registerNannyRequest.name,
    );
  }

  public static domainToDtoResponse(nanny: Nanny): RegisterNannyResponse {
    return new RegisterNannyResponse(
        nanny.getId().getValue(),
        nanny.getName().getValue(),
        nanny.getAuditTrail().getCreatedAt().format(),
        nanny.getAuditTrail().getCreatedBy().getValue()
    );
  }

  public static commandToDomain(command: RegisterNanny, userId: number): Nanny {
    const nannyName: NannyName = NannyName.create(command.name);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    let nanny: Nanny = NannyFactory.from(nannyName, auditTrail);
    return nanny;
  }

  public static domainToEntity(nanny: Nanny): NannyEntity {
    const nannyEntity: NannyEntity = new NannyEntity();
    NannyEntity.nannyName = NannyNameValue.from(nanny.getName().getValue());
    const createdAt: string = nanny.getAuditTrail() != null && nanny.getAuditTrail().getCreatedAt() != null ? nanny.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = nanny.getAuditTrail() != null && nanny.getAuditTrail().getCreatedBy() != null ? nanny.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = nanny.getAuditTrail() != null && nanny.getAuditTrail().getUpdatedAt() != null ? nanny.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = nanny.getAuditTrail() != null && nanny.getAuditTrail().getUpdatedBy() != null ? nanny.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    nannyEntity.auditTrail = auditTrailValue;
    return nannyEntity;
  }

  public static entityToDomain(nannyEntity: NannyEntity): Nanny {
    if (NannyEntity == null) return null;
    const nannyName: NannyName = NannyName.create(nannyEntity.nannyName.value);
    const auditTrail: AuditTrail = AuditTrail.from(
        nannyEntity.auditTrail.createdAt != null ? DateTime.fromString(nannyEntity.auditTrail.createdAt) : null,
        nannyEntity.auditTrail.createdBy != null ? UserId.of(nannyEntity.auditTrail.createdBy) : null,
        nannyEntity.auditTrail.updatedAt != null ? DateTime.fromString(nannyEntity.auditTrail.updatedAt) : null,
        nannyEntity.auditTrail.updatedBy != null ? UserId.of(nannyEntity.auditTrail.updatedBy) : null
    );
    const clientId: ClientId = ClientId.of(nannyEntity.id);
    let nanny: Nanny = NannyEntity.withId(clientId, nannyName, auditTrail);
    return nanny;
  }

  public static ormToNannyClientDto(row: any): NannyClientDto {
    let dto = new NannyClientDto();
    dto.id = Number(row.id);
    dto.NannyName = row.nannyName;
    return dto;
  }
}