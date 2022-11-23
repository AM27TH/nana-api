import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { ParentRegistered } from 'src/clients/domain/events/parent-registered.event';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { ParentName } from 'src/shared/domain/values/parent-name.value';
import { ClientId } from './client-id.value';
import { Dni } from '../../../../shared/domain/values/dni.value';
import { Client } from './client.root.entity';

export class Parent extends Client {
  private name: ParentName;
  private dni: Dni;

  public constructor(name: ParentName, dni: Dni, auditTrail: AuditTrail) {
    super(ClientType.Parent, auditTrail);
    this.name = name;
    this.dni = dni;
  }

  public register() {
    const event = new ParentRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
    this.apply(event);
  }

  public getId(): ClientId {
    return this.id;
  }

  public getName(): ParentName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeName(name: ParentName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}