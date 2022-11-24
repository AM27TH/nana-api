import { ClientId } from './client-id.value';
import { Client } from './client.root.entity';
import { NannyName } from 'src/shared/domain/values/nanny-name.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { NannyRegistered } from 'src/clients/domain/events/nanny-registered.event';

export class Nanny extends Client {
  private name: NannyName;

  public constructor(name: NannyName, auditTrail: AuditTrail) {
    super(ClientType.NANNY, auditTrail);
    this.name = name;
  }

  public register() {
    const event = new NannyRegistered(this.id.getValue(), this.name.getValue());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): NannyName {
    return this.name;
  }
  
  public changeName(name: NannyName): void {
    this.name = name;
  }
}