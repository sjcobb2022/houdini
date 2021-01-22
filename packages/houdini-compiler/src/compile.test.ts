// locals
import { flattenFragments } from './main'

test('flattenFragments - happy path', function () {
	// build up the list of dependents
	const fragments = {
		A: {
			requiredFragments: ['B', 'C'],
		},
		B: {
			requiredFragments: ['B', 'C'],
		},
		C: {
			requiredFragments: ['D'],
		},
		D: {
			requiredFragments: [],
		},
	}

	// the document we are flattening
	const doc = {
		requiredFragments: ['A'],
	}

	// make sure we get the expected value
	expect(flattenFragments(doc, fragments)).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D']))
})