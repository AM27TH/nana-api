import { InjectRepository } from "@nestjs/typeorm";
import { ParentMapper } from "src/clients/application/mappers/parent.mapper";
import { Parent } from "src/clients/domain/aggregates/client/parent.entity";
import { ParentRepository } from "src/clients/domain/aggregates/client/parent.repository";
import { Repository } from "typeorm";
import { ParentEntity } from "../entities/parent.entity";

export class ParentEntityRepository implements ParentRepository  {
  constructor(
    @InjectRepository(ParentEntity)
    private parentRepository: Repository<ParentEntity>,
  ) {}

  async create(parent: Parent): Promise<Parent> {
    let parentEntity: ParentEntity = ParentMapper.domainToEntity(parent);
    parentEntity = await this.parentRepository.save(parentEntity);
    return ParentMapper.entityToDomain(parentEntity);
  }

  async update(parent: Parent): Promise<Parent> {
    let parentEntity: ParentEntity = ParentMapper.domainToEntity(parent);
    let parentId: number = parent.getId().getValue();
    await this.parentRepository.update({ id: parentId }, parentEntity);
    return parent;
  }

  async delete(parentId: number): Promise<boolean> {
    await this.parentRepository.delete({ id: parentId });
    return true;
  }

  async getById(id: number): Promise<Parent> {
    let parentEntity: ParentEntity = await this.parentRepository.findOne({ where: { id: id } });
    return ParentMapper.entityToDomain(parentEntity);
  }

  async getByDni(dni: string): Promise<Parent> {
    let parentEntity: ParentEntity = await this.parentRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
    return ParentMapper.entityToDomain(parentEntity);
  }
}