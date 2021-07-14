// This is the class of the input linked list.
class LinkedList {
    value: any
    next: LinkedList | null

    constructor(value: any) {
        this.value = value
        this.next = null
    }
}

export function getArrayFromLinkedList(head: LinkedList, array: any[] = []): any[] {
	array.push(head.value)

	if (!head.next) return array;

	return getArrayFromLinkedList(head.next, array)
}

export function getLinkedListFromArray(array: any[]): LinkedList {
	const firstHead = new LinkedList(array[0])
	const remainingItems = [...array].splice(1)
	let currentHead = firstHead

	for (const item of remainingItems) {
		currentHead.next = new LinkedList(item)
		currentHead = currentHead.next
	}

	return firstHead
}

export default (head: LinkedList, k: number) => {
	const array = getArrayFromLinkedList(head)

	array.splice(
		0, 0, ...array.splice(
			array.length - (
				Math.abs(k) % array.length - (
					k < 0 ? Math.abs(k) : 0
				)
			), Math.abs(k)
		)
	)

	array.splice(
		array.length,
		0, ...array.splice(
			0,
			k < 0 ? Math.abs(k) % array.length : 0
		)
	)

	return k ? getLinkedListFromArray(array) : head
}