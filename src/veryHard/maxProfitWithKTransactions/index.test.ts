import maxProfitWithKTransactions from '.'

test('Get the best max profit with k transactions', () => {
    expect(
        maxProfitWithKTransactions([5, 11, 3, 90, 8, 50, 1, 30], 2)
    ).toBe(129)

    expect(
        maxProfitWithKTransactions([5, 11, 3, 90, 8, 50, 1, 30], 1)
    ).toBe(87)

    expect(
        maxProfitWithKTransactions([5, 11, 3, 90, 8, 50, 1, 30], 3)
    ).toBe(158)

    expect(
        maxProfitWithKTransactions([5, 11, 3, 90, 8, 50, 1, 30], 4)
    ).toBe(164)

    expect(
        maxProfitWithKTransactions([5, 11, 3, 80], 2)
    ).toBe(83)
})