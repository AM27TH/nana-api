import { InjectRepository } from "@nestjs/typeorm";
import { Nanny } from "src/clients/domain/aggregates/client/nanny.entity";
import { NannyRepository } from "src/clients/domain/aggregates/client/nanny.repository";
import { Repository } from "typeorm";
import { NannyEntity } from "../entities/nanny.entity";
import { NannyMapper } from '../../../application/mappers/nanny.mapper';

export class NannyEntityRepository implements NannyRepository  {
  constructor(
    @InjectRepository(NannyEntity)
    private nannyRepository: Repository<NannyEntity>,
  ) {}

  async create(nanny: Nanny): Promise<Nanny> {
    let nannyEntity: NannyEntity = NannyMapper.domainToEntity(nanny);
    nannyEntity = await this.nannyRepository.save(nannyEntity);
    return NannyMapper.entityToDomain(nannyEntity);
  }

  async update(nanny: Nanny): Promise<Nanny> {
    let nannyEntity: NannyEntity = NannyMapper.domainToEntity(nanny);
    let nannyId: number = nanny.getId().getValue();
    await this.nannyRepository.update({ id: nannyId }, nannyEntity);
    return nanny;
  }

  async delete(nannyId: number): Promise<boolean> {
    await this.nannyRepository.delete({ id: nannyId });
    return true;
  }

  async getById(id: number): Promise<Nanny> {
    let nannyEntity: NannyEntity = await this.nannyRepository.findOne({ where: { id: id } });
    return NannyMapper.entityToDomain(nannyEntity);
  }

  async getByName(name: string): Promise<Nanny> {
    let nannyEntity: NannyEntity = await this.nannyRepository.createQueryBuilder('nanny').where("nanny.nannyName.value = :nannyName", { nannyName: name }).getOne();
    return NannyMapper.entityToDomain(nannyEntity);
  }
}