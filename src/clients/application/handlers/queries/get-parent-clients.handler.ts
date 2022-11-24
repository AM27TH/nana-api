import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';
import { ParentClientDto } from '../../dtos/response/parent-client.dto';
import { GetParentClients } from '../../messages/queries/get-parent-clients.query';
import { ParentMapper } from '../../mappers/parent.mapper';

@QueryHandler(GetParentClients)
export class GetParentClientsHandler implements IQueryHandler<GetParentClients> {
  constructor(private dataSource: DataSource) {}

  async execute(query: GetParentClients) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      clients
    WHERE
      type = 'P'
    ORDER BY
      last_name, first_name;`;
    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];
    const parentClients: ParentClientDto[] = rows.map(function (row: any) {
      return ParentMapper.ormToParentClientDto(row);
    });
    return parentClients;
  }
}