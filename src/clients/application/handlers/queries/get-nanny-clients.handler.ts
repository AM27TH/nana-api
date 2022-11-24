import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { NannyClientDto } from '../../dtos/response/nanny-client.dto';
import { NannyMapper } from '../../mappers/nanny.mapper';
import { GetNannyClients } from '../../messages/queries/get-nanny-clients.query';

@QueryHandler(GetNannyClients)
export class GetNannyClientsHandler implements IQueryHandler<GetNannyClients> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetNannyClients) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      company_name as companyName,
      ruc
    FROM 
      clients
    WHERE
      type = 'C'
    ORDER BY
      company_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const nannyClients: NannyClientDto[] = rows.map(function (row: any) {
      return NannyMapper.ormToNannyClientDto(row);
    });
    return nannyClients;
  }
}