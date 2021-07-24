import shiftLinkedList, {
    getLinkedListFromArray,
    getArrayFromLinkedList
} from '.'

test('The linked lists are correctly shifted', () => {
    const linkedList = getLinkedListFromArray([
        0, 1, 2, 3, 4, 5
    ])

    expect(
        getArrayFromLinkedList(
            shiftLinkedList(linkedList, 2)
        )
    ).toEqual([
        4, 5, 0, 1, 2, 3
    ])

    expect(
        getArrayFromLinkedList(
            shiftLinkedList(linkedList, 0)
        )
    ).toEqual([
        0, 1, 2, 3, 4, 5
    ])

    expect(
        getArrayFromLinkedList(
            shiftLinkedList(linkedList, -1)
        )
    ).toEqual([
        1, 2, 3, 4, 5, 0
    ])

    expect(
        getArrayFromLinkedList(
            shiftLinkedList(linkedList, 6)
        )
    ).toEqual([
        0, 1, 2, 3, 4, 5
    ])

    expect(
        getArrayFromLinkedList(
            shiftLinkedList(linkedList, -2)
        )
    ).toEqual([
        2, 3, 4, 5, 0, 1
    ])

    expect(
        getArrayFromLinkedList(
            shiftLinkedList(linkedList, -20)
        )
    ).toEqual([
        2, 3, 4, 5, 0, 1
    ])

    expect(
        getArrayFromLinkedList(
            shiftLinkedList(linkedList, 14)
        )
    ).toEqual([
        4, 5, 0, 1, 2, 3  
    ])
})