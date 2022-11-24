import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { NannyRegistered } from '../../../../clients/domain/events/nanny-registered.event';

@EventsHandler(NannyRegistered)
export class NannyRegisteredHandler implements IEventHandler<NannyRegistered> {
  constructor() {}

  async handle(event: NannyRegistered) {
    console.log(event);
  }
}