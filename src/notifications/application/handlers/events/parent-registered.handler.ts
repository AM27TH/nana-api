import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ParentRegistered } from '../../../../clients/domain/events/parent-registered.event';

@EventsHandler(ParentRegistered)
export class ParentRegisteredHandler implements IEventHandler<ParentRegistered> {
  constructor() {}

  async handle(event: ParentRegistered) {
    console.log(event);
  }
}