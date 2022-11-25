import { ParentName } from 'src/shared/domain/values/parent-name.value';
import { Dni } from 'src/shared/domain/values/dni.value';
import { IdNumber } from 'src/shared/domain/values/id-number.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { ParentFactory } from '../../factories/parent.factory';
import { Parent } from './parent.entity';

describe('Parent', () => {
  let parent: Parent;
  let parentId: IdNumber;
  let name: ParentName;
  let auditTrail: AuditTrail;
  let dni: Dni;

  beforeEach(() => {
    parentId = IdNumber.of(1);
    name = ParentName.create('ClientName', 'ClientLastName');
    dni = Dni.create('99999999');
  });

  describe('register', () => {
    it('should register in Nana', () => {
      parent =ParentFactory.withId(parentId, name, dni, auditTrail);

      expect(parent.getId()).toEqual(parentId);
    });
  });
});