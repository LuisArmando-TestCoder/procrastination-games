import whatsTheRealFloor from '.';

test('A floor in the american system returns the floor in the european one', () => {
    expect(whatsTheRealFloor(1)).toBe(0)
    expect(whatsTheRealFloor(0)).toBe(0)
    expect(whatsTheRealFloor(5)).toBe(4)
    expect(whatsTheRealFloor(15)).toBe(13)
    expect(whatsTheRealFloor(-3)).toBe(-3)
})
