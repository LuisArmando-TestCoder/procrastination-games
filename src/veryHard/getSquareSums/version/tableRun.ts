export function getHavingSquareRoot(number: number): boolean {
    return !!(Math.sqrt(number) % 1 === 0)
}

export function getHavingValidSquareSums(sequence: number[] | false) {
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

function getRootsPaths(n: number): number[][] {
    const rootPaths: number[][] = []

    for (let i = 1; i <= n; i++) {
        rootPaths.push([])

        for (let j = 1; j <= n; j++) {
            if (i === j) continue

            if (getHavingSquareRoot(i + j)) {
                rootPaths[i - 1].push(j)
            }
        }
    }

    return rootPaths
}

function getBranches(paths: number[][]) {
    const branches: number[][]  = []

    Object.keys(paths).forEach((pathKey: string) => {
        const index = Number(pathKey)
        const pathNode = index + 1
        const path = paths[index]

        branches.push([
            pathNode,
            path[path.length - 1]
        ])

        const getCarryPath = () => paths[
            branches[index][
                branches[index].length - 1
            ] - 1
        ]
        const setCarryPath = (j: number): boolean => {
            const canBreak = !branches[index].includes(
                getCarryPath()[j]
            )

            if (canBreak) {
                branches[index].push(getCarryPath()[j])
            }

            return canBreak
        }

        // spin <<paths.length - 2>> times
        for (let pathIndex = 2; pathIndex < paths.length; pathIndex++) {
            if (pathIndex < paths.length / 2) {
                // pick upper half
                for (let j = getCarryPath().length - 1; j >= 0; j--) {
                // take the last element of each path
                // ... that is not present in branches
                    if (setCarryPath(j)) break
                }
            } else if (pathIndex >= Math.floor(paths.length / 2)) {
                // pick lower half
                for (let j = 0; j < getCarryPath().length; j++) {
                    // take the first element of each path
                    // ... that is not present in branches
                    if (setCarryPath(j)) break
                }
            }            
        }
    })

    return branches
}

export default (n: number): number[] | false => {
    const paths = getRootsPaths(n)
    const branches = getBranches(paths)

    const validSquareSumsRows = branches.filter(branch => (
        getHavingValidSquareSums(branch) && branch.length === n
    ))
    const [squareSumsRow] = validSquareSumsRows

    console.log(
        "\nbranches", branches
    )

    return squareSumsRow || false
}