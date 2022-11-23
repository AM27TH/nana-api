import { Column } from 'typeorm';

export class NannyNameValue {
  @Column('varchar', { name: 'nanny_name', length: 150, nullable: true })
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(name: string): NannyNameValue {
    return new NannyNameValue(name);
  }
}