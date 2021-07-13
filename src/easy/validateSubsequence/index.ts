export default (array: number[], sequence: number[]): boolean => {
    for (const number of array) {
        if (sequence[0] === number) {
            sequence.splice(0, 1)
        }
    }

    return !sequence.length
}