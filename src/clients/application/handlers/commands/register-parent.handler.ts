import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterParent } from './register-parent.command';
import { ParentMapper } from '../../mappers/parent.mapper';
import { Parent } from 'src/clients/domain/aggregates/client/parent.entity';
import { Inject } from '@nestjs/common';
import { ParentRepository, PARENT_REPOSITORY } from 'src/clients/domain/aggregates/client/parent.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterParent)
export class RegisterParentHandler
  implements ICommandHandler<RegisterParent> {
  constructor(
    private dataSource: DataSource,
    @Inject(PARENT_REPOSITORY)
    private readonly parentRepository: ParentRepository,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: RegisterParent) {
    let parent: Parent = ParentMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      parent = await this.parentRepository.create(parent);
      if (parent == null) throw new Error("");
      parent = this.publisher.mergeObjectContext(parent);
      parent.register();
      parent.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      parent = null;
    } finally {
      await queryRunner.release();
    }
    return parent;
  }
}