import { AuditTrail } from '../../../shared/domain/values/audit-trail.value';
import { ParentName } from '../../../shared/domain/values/parent-name.value';
import { Parent } from '../aggregates/client/parent.entity';
import { ClientId } from '../aggregates/client/client-id.value';
import { Dni } from '../../../shared/domain/values/dni.value';

export class ParentFactory {
  public static withId(id: ClientId, name: ParentName, dni: Dni, auditTrail: AuditTrail): Parent {
    let parent: Parent = new Parent(name, dni, auditTrail);
    parent.changeId(id);
    return parent;
  }

  public static from(name: ParentName, dni: Dni, auditTrail: AuditTrail): Parent {
    return new Parent(name, dni, auditTrail);
  }
}