import overTheRoad from '.'

test('Get the respective number for the house on the other side of the road', () => {
    expect(overTheRoad(1, 3)).toBe(6)
    expect(overTheRoad(3, 3)).toBe(4)
    expect(overTheRoad(2, 3)).toBe(5)
    expect(overTheRoad(3, 5)).toBe(8)
})