import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { ChildEntity, Column } from 'typeorm';
import { DniValue } from '../values/dni.value';
import { ParentNameValue } from '../values/parent-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.PARENT)
export class ParentEntity extends ClientEntity {
  @Column((type) => ParentNameValue, { prefix: false })
  public name: ParentNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;
  parentEntity: import("c:/Users/Nadia/OneDrive/Documentos/Visual Studio 2022/Templates/ProjectTemplates/TypeScript/nana-api/src/clients/infrastructure/persistence/values/parent-name.value").ParentNameValue;
  auditTrail: import("c:/Users/Nadia/OneDrive/Documentos/Visual Studio 2022/Templates/ProjectTemplates/TypeScript/nana-api/src/shared/infrastructure/persistence/values/audit-trail.value").AuditTrailValue;
}