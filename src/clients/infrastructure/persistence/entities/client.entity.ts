
import { ClientType } from 'src/clients/domain/aggregates/client/client-type.enum';
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity('clients')
@TableInheritance({ column: 'type', })
export class ClientEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column({ name: 'type', type: 'enum', enum: ClientType, default: ClientType.Nanny })
  readonly type: ClientType;
}