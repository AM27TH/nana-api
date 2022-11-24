import { Parent } from "./parent.entity";

export const PARENT_REPOSITORY = 'ParentRepository';

export interface ParentRepository {
  create(parent: Parent): Promise<Parent>;
  update(parent: Parent): Promise<Parent>;
  delete(parentId: number): Promise<boolean>;
  getById(id: number): Promise<Parent>;
  getByDni(dni: string): Promise<Parent>;
}