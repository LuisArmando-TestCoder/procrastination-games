interface RiverInfo {
    matrix: number[][]
    sizes: number[],
    rowIndex: number,
    cellIndex: number
}

function increaseRiverLenght({
	matrix,
	sizes,
	rowIndex,
	cellIndex,
}: RiverInfo) {
	for (let x = -1; x < 2; x++) {
		for (let y = -1; y < 2; y++) {
			const [i, j] = [rowIndex + x, cellIndex + y]
			const otherCell = matrix[i] && matrix[i][j]
			const isValidRiverCell = !!(+!x ^ +!y)

			if (isValidRiverCell && otherCell) {
				matrix[i][j] -= +!!(++sizes[sizes.length - 1])

				increaseRiverLenght({ matrix, sizes, rowIndex: i, cellIndex: j })
			}
		}
	}
}

export default function riverSizes(matrix: number[][]) {
	const sizes: number[] = []
	
	matrix.forEach((row, rowIndex) => {
		row.forEach((cell, cellIndex) => {
			if (cell) {
				sizes.push(1)

				increaseRiverLenght({ matrix, sizes, rowIndex, cellIndex })
			}
		})
	})
	
	return sizes.map(cell => cell - +(cell > 1))
}
