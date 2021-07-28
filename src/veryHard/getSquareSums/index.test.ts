import getSquareSums, {getHavingValidSquareSums} from '.'

test('Get a valid square sum array or falsy output', () => {
    expect(
        getHavingValidSquareSums(
            getSquareSums(15)
        )
    ).toBeTruthy()

    expect(
        getHavingValidSquareSums(
            getSquareSums(23)
        )
    ).toBeTruthy()

    expect(
        getHavingValidSquareSums(
            getSquareSums(31)
        )
    ).toBeTruthy()

    expect(
        getSquareSums(1)
    ).toBeFalsy()

    expect(getSquareSums(14)).toBeFalsy()
})