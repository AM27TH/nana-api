import { AuditTrailValue } from 'src/shared/infrastructure/persistence/values/audit-trail.value';
import { ClientId } from 'src/clients/domain/aggregates/client/client-id.value';
import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { NannyName } from 'src/shared/domain/values/nanny-name.value';
import { ChildEntity, Column } from 'typeorm';
import { NannyNameValue } from '../values/nanny-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.NANNY)
export class NannyEntity extends ClientEntity {
  static withId(clientId: ClientId, nannyName: NannyName, auditTrail: AuditTrail): import("../../../domain/aggregates/client/nanny.entity").Nanny {
    throw new Error('Method not implemented.');
  }
  @Column((type) => NannyNameValue, { prefix: false })
  static nannyName: NannyNameValue;

  @Column((type) => AuditTrailValue, { prefix: false })
  auditTrail: AuditTrailValue;

}
