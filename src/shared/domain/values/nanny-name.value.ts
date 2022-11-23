import { Result } from 'typescript-result';
import { AppNotification } from '../../application/app.notification';

export class NannyName {
  private readonly value: string;
  private static MAX_LENGTH: number = 150;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(name: string): NannyName {
    name = (name ?? "").trim();
    return new NannyName(name);
  }

  public static createv2(name: string): Result<AppNotification, NannyName> {
    let notification: AppNotification = new AppNotification();
    name = (name ?? "").trim();
    if (name === "") {
      notification.addError('name is required', null);
    }
    if (name.length > this.MAX_LENGTH) {
      notification.addError('The maximum length of an name is ' + this.MAX_LENGTH + ' characters including spaces', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new NannyName(name));
  }
}