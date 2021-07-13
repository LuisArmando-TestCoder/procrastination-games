/**
 * Given two non-empty arrays of integers,
 * write a function that determines whether
 * the second array is a subsequence of the
 * first one.
 * 
 * A subsequence of an array is a set of
 * numbers that aren't necessarily adjacent
 * in the array but that are in the same
 * order as they appear in the array.
 */

import validateSubsequence from '.';

test('The subsequences are correctly spotted', () => {
    const array = [5, 1, 22, 25, 6, -1, 8, 10]

    expect(
        validateSubsequence(
            array,
            [1, 6, -1, 10]
        )
    ).toBe(true)

    expect(
        validateSubsequence(
            array,
            [5, 1, 22, 25, 6, -1, 8, 10, 12]
        )
    ).toBe(false)

    expect(
        validateSubsequence(
            array,
            [1, 6, -1, 10, 11, 11, 11, 11]
        )
    ).toBe(false)

    expect(
        validateSubsequence(
            array,
            [1, 6, -1, -1]
        )
    ).toBe(false)

    expect(
        validateSubsequence(
            array,
            [1, 6, 10]
        )
    ).toBe(true)
})
