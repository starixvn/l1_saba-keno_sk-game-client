import { SystemType } from '../../../src/common/constants/system';

describe('SystemType Enum', () => {
    it('should have SK as "sk"', () => {
        expect(SystemType.SK).toBe("sk");
    });
}); 