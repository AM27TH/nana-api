import { Inject, Injectable } from '@nestjs/common';
import { AppNotification } from 'src/shared/application/app.notification';
import { RegisterParent } from '../handlers/commands/register-parent.command';
import { ParentRepository, PARENT_REPOSITORY } from 'src/clients/domain/aggregates/client/parent.repository';
import { Parent } from 'src/clients/domain/aggregates/client/parent.entity';

@Injectable()
export class RegisterParentValidator {
  constructor(
    @Inject(PARENT_REPOSITORY)
    private parentRepository: ParentRepository,
  ) {
  }

  public async validate(registerParent: RegisterParent,): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerParent.firstName ? registerParent.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerParent.lastName ? registerParent.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerParent.dni ? registerParent.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const parent: Parent = await this.parentRepository.getByDni(dni);
    if (parent != null) notification.addError('dni is taken', null);
    
    return notification;
  }
}