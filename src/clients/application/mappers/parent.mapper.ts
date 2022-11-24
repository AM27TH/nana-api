import { Parent } from 'src/clients/domain/aggregates/client/parent.entity';
import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { RegisterParent } from '../messages/commands/register-parent.command';
import { ParentName } from 'src/shared/domain/values/parent-name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { DateTime } from 'src/shared/domain/values/date-time.value';
import { ParentFactory } from 'src/clients/domain/factories/parent.factory';
import { ParentClientDto } from '../dtos/response/parent-client.dto';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { RegisterParentRequest } from '../dtos/request/register-parent-request.dto';
import { RegisterParentResponse } from '../dtos/response/register-parent-response.dto';
import { ParentEntity } from 'src/clients/infrastructure/persistence/entities/parent.entity';
import { ParentNameValue } from 'src/clients/infrastructure/persistence/values/parent-name.value';
import { DniValue } from 'src/clients/infrastructure/persistence/values/dni.value';
import { UserId } from 'src/users/domain/aggregates/user/user-id.value';

export class ParentMapper {
  public static dtoRequestToCommand(registerParentRequest: RegisterParentRequest) {
    return new RegisterParent(
      registerParentRequest.firstName,
      registerParentRequest.lastName,
      registerParentRequest.dni,
    );
  }

  public static domainToDtoResponse(parent: Parent) {
    return new RegisterParentResponse(
      parent.getId().getValue(),
      parent.getName().getFirstName(),
      parent.getName().getLastName(),
      parent.getDni().getValue(),
      parent.getAuditTrail().getCreatedAt().format(),
      parent.getAuditTrail().getCreatedBy().getValue()
    );
  }
  
  public static commandToDomain(command: RegisterParent, userId: number): Parent {
    const parentName: ParentName = ParentName.create(command.firstName, command.lastName);
    const dni: Dni = Dni.create(command.dni);
    const auditTrail: AuditTrail = AuditTrail.from(
      DateTime.utcNow(),
      UserId.of(userId),
      null,
      null
    );
    let parent: Parent = ParentFactory.from(parentName, dni, auditTrail);
    return parent;
  }

  public static domainToEntity(parent: Parent): ParentEntity {
    const parentEntity: ParentEntity = new ParentEntity();
    parentEntity.name = ParentNameValue.from(parent.getName().getFirstName(), parent.getName().getLastName());
    parentEntity.dni = DniValue.from(parent.getDni().getValue());
    const createdAt: string = parent.getAuditTrail() != null && parent.getAuditTrail().getCreatedAt() != null ? parent.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = parent.getAuditTrail() != null && parent.getAuditTrail().getCreatedBy() != null ? parent.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = parent.getAuditTrail() != null && parent.getAuditTrail().getUpdatedAt() != null ? parent.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = parent.getAuditTrail() != null && parent.getAuditTrail().getUpdatedBy() != null ? parent.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailValue: AuditTrailValue = AuditTrailValue.from(createdAt, createdBy, updatedAt, updatedBy);
    parentEntity.auditTrail = auditTrailValue;
    return parentEntity;
  }

  public static entityToDomain(parentEntity: ParentEntity): Parent {
    if (parentEntity == null) return null;
    const parentName: ParentName = ParentName.create(parentEntity.name.firstName, parentEntity.name.lastName);
    const dni: Dni = Dni.create(parentEntity.dni.value);
    const auditTrail: AuditTrail = AuditTrail.from(
      parentEntity.auditTrail.createdAt != null ? DateTime.fromString(parentEntity.auditTrail.createdAt) : null,
      parentEntity.auditTrail.createdBy != null ? UserId.of(parentEntity.auditTrail.createdBy) : null,
      parentEntity.auditTrail.updatedAt != null ? DateTime.fromString(parentEntity.auditTrail.updatedAt) : null,
      parentEntity.auditTrail.updatedBy != null ? UserId.of(parentEntity.auditTrail.updatedBy) : null
    );
    const clientId: ClientId = ClientId.of(parentEntity.id);
    let parent: Parent = ParentFactory.withId(clientId, parentName, dni, auditTrail);
    return parent;
  }

  public static ormToParentClientDto(row: any): ParentClientDto {
    let dto = new ParentClientDto();
    dto.id = Number(row.id);
    dto.firstName = row.firstName;
    dto.lastName = row.lastName;
    dto.dni = row.dni;
    return dto;
  }
}