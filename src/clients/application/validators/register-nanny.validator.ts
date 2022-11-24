import { Inject, Injectable } from '@nestjs/common';
import { Nanny } from 'src/clients/domain/aggregates/client/nanny.entity';
import { NannyRepository, NANNY_REPOSITORY } from 'src/clients/domain/aggregates/client/nanny.repository';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterNanny } from '../handlers/commands/register-nanny.command';

@Injectable()
export class RegisterNannyValidator {
  constructor(
    @Inject(NANNY_REPOSITORY)
    private nannyRepository: NannyRepository,
  ) {
  }

  public async validate(registerNanny: RegisterNanny): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerNanny.name.trim();
    if (name.length <= 0) {
      notification.addError('name is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    let nanny: Nanny = await this.nannyRepository.getByName(name);
    if (nanny != null) {
      notification.addError('name is taken', null);
      return notification;
    }
  }
}