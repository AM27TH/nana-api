import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { ChildEntity, Column } from 'typeorm';
import { NannyNameValue } from '../values/nanny-name.value';
import { ClientEntity } from './client.entity';

@ChildEntity(ClientType.Nanny)
export class CompanyEntity extends ClientEntity {
  @Column((type) => NannyNameValue, { prefix: false })
  public nannyName: NannyNameValue;

}