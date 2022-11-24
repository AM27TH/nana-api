import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterNanny } from 'src/clients/application/handlers/commands/register-nanny.command';
import { NannyMapper } from '../../mappers/nanny.mapper';
import { Nanny } from 'src/clients/domain/aggregates/client/nanny.entity';
import { Inject } from '@nestjs/common';
import { NannyRepository, NANNY_REPOSITORY } from 'src/clients/domain/aggregates/client/nanny.repository';
import { AppSettings } from 'src/shared/application/app-settings';
import { DataSource } from 'typeorm';

@CommandHandler(RegisterNanny)
export class RegisterNannyHandler
  implements ICommandHandler<RegisterNanny> {
  constructor(
    private dataSource: DataSource,
    @Inject(NANNY_REPOSITORY)
    private readonly nannyRepository: NannyRepository,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterNanny) {
    let nanny: Nanny = NannyMapper.commandToDomain(command, AppSettings.SUPER_ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      nanny = await this.nannyRepository.create(nanny);
      if (nanny == null) throw new Error("");
      nanny = this.publisher.mergeObjectContext(nanny);
      nanny.register();
      nanny.commit();
      await queryRunner.commitTransaction();
    } catch(err) {
      await queryRunner.rollbackTransaction();
      nanny = null;
    } finally {
      await queryRunner.release();
    }
    return nanny;
  }
}