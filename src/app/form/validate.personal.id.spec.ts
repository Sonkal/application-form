import { ValidatePersonalId } from './validate.personal.id';

describe('ValidatePersonalId', () => {
  it('should create an instance', () => {
    const directive = new ValidatePersonalId();
    expect(directive).toBeTruthy();
  });
});
