import { describe, expect, it } from 'vitest';
import { finestRange } from '#lib/season.ts';

describe('finestRange', () => {
	it('joins consecutive months into one range', () => {
		expect(finestRange([0, 0, 0, 0, 0, 2, 3, 3, 3, 1, 0, 0])).toBe('Jul–Sep');
	});

	it('keeps separate runs apart and single months alone', () => {
		expect(finestRange([1, 1, 3, 3, 2, 1, 0, 0, 2, 3, 3, 1])).toBe('Mar–Apr · Oct–Nov');
		expect(finestRange([1, 1, 2, 2, 2, 0, 0, 0, 1, 2, 3, 1])).toBe('Nov');
	});

	it('keeps a run across the turn of the year whole', () => {
		expect(finestRange([3, 3, 3, 2, 1, 0, 0, 0, 0, 1, 2, 3])).toBe('Dec–Mar');
	});
});
