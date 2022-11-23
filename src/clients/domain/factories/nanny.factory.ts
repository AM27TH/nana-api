import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { NannyName } from '../../../shared/domain/values/nanny-name.value';
import { Nanny } from '../aggregates/client/nanny.entity';
import { ClientId } from '../aggregates/client/client-id.value';

export class NannyFactory {
  public static withId(id: ClientId, name: NannyName, auditTrail: AuditTrail): Nanny {
    let nanny: Nanny = new Nanny(name, auditTrail);
    nanny.changeId(id);
    return nanny;
  }

  public static from(name: NannyName, auditTrail: AuditTrail): Nanny {
    return new Nanny(name, auditTrail);
  }
}