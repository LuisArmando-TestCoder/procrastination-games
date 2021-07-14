/**
 * Write a function that takes in the head of
 * a Singly Linked List and an integer k,
 * shifts the list in place
 * (i.e., doesn't create a brand new list)
 * by k positions, and returns its new head.
 * 
 * Shifting a Linked List means moving
 * its nodes forward or backward and
 * wrapping them around the list where
 * appropriate. For example, shifting a Linked
 * List forward by one position would make its
 * tail become the new head of the linked list.
 * 
 * Whether nodes are moved forward or backward
 * is determined by whether k is positive or negative.
 * 
 * Each LinkedList node has an integer value
 * as well as a next node pointing to the next
 * node in the list or to None / null if it's
 * the tail of the list.
 * 
 * You can assume that the input Linked List
 * will always have at least one node; in other
 * words, the head will never be None / null.
 * 
 */

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