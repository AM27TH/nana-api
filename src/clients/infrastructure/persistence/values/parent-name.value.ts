import { Column } from 'typeorm';

export class ParentNameValue {
  @Column('varchar', { name: 'first_name', length: 75, nullable: true })
  public firstName: string;

  @Column('varchar', { name: 'last_name', length: 75, nullable: true })
  public lastName: string;

  private constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static from(firstName: string, lastName: string): ParentNameValue {
    return new ParentNameValue(firstName, lastName);
  }
}