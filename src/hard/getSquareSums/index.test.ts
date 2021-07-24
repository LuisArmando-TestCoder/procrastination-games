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
            // expecting [9, 7, 2, 14, 11, 5, 4, 12, 13, 3, 6, 10, 15, 1, 8]
            // ^^^ From getSquareSums(15)
            getSquareSums(15)
        )
    ).toBeTruthy()

    expect(
        getHavingValidSquareSums(
            getSquareSums(23)
        )
    ).toBeTruthy()

    expect(
        // expecting undefined
        // ^^^ From getSquareSums(1)
        getSquareSums(1)
    ).toBeFalsy()

    expect(getSquareSums(14)).toBeTruthy()
})