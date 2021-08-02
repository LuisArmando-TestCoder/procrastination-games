// half-half array separator -> [ 1, 2, 3 ] -> [ [1], [2], [3] ] 

// tree mixer

// sorted array run
function getSortedArraysRun(
    // merge sort is better for sets
    firstArray: number[],
    secondArray: number[]
    // each array needs to be a set
): number[] {
    const sortedArrayRun: number[]= []

    // assume that both arrays have same length
    firstArray.forEach((firstArrayElement: number, index: number) => {
        const secondArrayElement = secondArray[index]
        const currentDirection = Math.sign(
            (firstArrayElement - secondArrayElement)
        )
        const orderSwitch = Math.sign(
            currentDirection + Math.abs(currentDirection)
        )
        const orderTuple = [firstArrayElement, secondArrayElement]
        const first = orderTuple[orderSwitch]
        const second = orderTuple[(orderSwitch + 1) % 2]

        sortedArrayRun.push(first, second)
    })

    return sortedArrayRun
}

export default () => {
    console.log(
        getSortedArraysRun(
            [1, 2, 7, 9],
            [0, 1, 2, 7],
        )
    )
}