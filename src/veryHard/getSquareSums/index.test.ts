import getSquareSums, {getHavingSquareRoot} from '.'

function getHavingValidSquareSums(sequence: number[] | false) {
    let havingValidSquareSums = false
    
    if (Array.isArray(sequence)) {
        let [carry] = sequence

        for (const item of sequence.slice(1)) {
            havingValidSquareSums = getHavingSquareRoot(carry + item)
            carry = item

            if (!havingValidSquareSums) break
        }
    }

    return havingValidSquareSums
}

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