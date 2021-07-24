import validateSubsequence from '.';

test('The subsequences are correctly spotted', () => {
    const array = [5, 1, 22, 25, 6, -1, 8, 10]

    expect(
        validateSubsequence(
            array,
            [1, 6, -1, 10]
        )
    ).toBeTruthy()

    expect(
        validateSubsequence(
            array,
            [5, 1, 22, 25, 6, -1, 8, 10, 12]
        )
    ).toBeFalsy()

    expect(
        validateSubsequence(
            array,
            [1, 6, -1, 10, 11, 11, 11, 11]
        )
    ).toBeFalsy()

    expect(
        validateSubsequence(
            array,
            [1, 6, -1, -1]
        )
    ).toBeFalsy()

    expect(
        validateSubsequence(
            array,
            [1, 6, 10]
        )
    ).toBeTruthy()
})
