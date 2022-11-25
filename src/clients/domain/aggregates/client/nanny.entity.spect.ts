import { NannyName } from 'src/shared/domain/values/nanny-name.value';
import { IdNumber } from 'src/shared/domain/values/id-number.value';
import { AuditTrail } from 'src/shared/domain/values/audit-trail.value';
import { NannyFactory } from '../../factories/nanny.factory';
import { Nanny } from './nanny.entity';

describe('Nanny', () => {
  let nanny: Nanny;
  let nannyId: IdNumber;
  let name: NannyName;
  let auditTrail:AuditTrail;

  beforeEach(() => {
    nannyId = IdNumber.of(1);
    name = NannyName.create('ClientName');
  });

  describe('register', () => {
    it('should register in Nana', () => {
      nanny =NannyFactory.withId(nannyId, name, auditTrail);

      expect(nanny.getId()).toEqual(nannyId);
    });
  });
});