import { Nanny } from "./nanny.entity";

export const NANNY_REPOSITORY = 'NannyRepository';

export interface NannyRepository {
  create(nanny: Nanny): Promise<Nanny>;
  update(nanny: Nanny): Promise<Nanny>;
  delete(nannyId: number): Promise<boolean>;
  getById(id: number): Promise<Nanny>;
  getByName(name: string): Promise<Nanny>;
}