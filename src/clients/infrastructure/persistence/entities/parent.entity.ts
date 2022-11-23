import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { ChildEntity, Column } from 'typeorm';
import { DniValue } from '../values/dni.value';
import { NannyNameValue } from '../values/nanny-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.Nanny)
export class PersonEntity extends ClientEntity {
  @Column((type) => NannyNameValue, { prefix: false })
  public name: NannyNameValue;

  @Column((type) => DniValue, { prefix: false })
  public dni: DniValue;
}