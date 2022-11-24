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
}