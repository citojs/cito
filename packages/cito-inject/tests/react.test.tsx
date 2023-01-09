import { describe, expect, test } from 'vitest';
import { Injectable, instantiate } from '../index';

describe('cito-inject react integration', () => {
	test('x', () => {
		@Injectable()
		class A {
			count = 1;
		}

		@Injectable()
		class B {
			constructor(public a: A) {
				// Empty
			}
		}

		const instance = instantiate(B);

		expect(instance.a).toBeInstanceOf(A);
	});
});
