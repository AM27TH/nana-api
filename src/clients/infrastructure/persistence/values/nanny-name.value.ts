import { Column } from 'typeorm';

export class NannyNameValue {
  lastName(firstName: (firstName: any, lastName: any) => import("../../../../shared/domain/values/parent-name.value").ParentName, lastName: any): import("../../../../shared/domain/values/parent-name.value").ParentName {
    throw new Error('Method not implemented.');
  }
  firstName(firstName: any, lastName: any): import("../../../../shared/domain/values/parent-name.value").ParentName {
    throw new Error('Method not implemented.');
  }
  @Column('varchar', { name: 'nanny_name', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): NannyNameValue {
    return new NannyNameValue(name);
  }
}